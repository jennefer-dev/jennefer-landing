"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const isProduction = process.env.NODE_ENV === "production";
const recordingDurationMs = 30_000;

if (typeof window !== "undefined" && isProduction && posthogKey && posthogHost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2025-05-24",
    capture_pageview: false,
    persistence: "memory",
    disable_session_recording: true,
    session_recording: { maskAllInputs: true },
  });
}

function PostHogPageView() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPathname.current === pathname) return;

    lastPathname.current = pathname;
    posthog.capture("$pageview");
  }, [pathname]);

  return null;
}

function PostHogInteractionTracking() {
  useEffect(() => {
    let recordingTimer: number | null = null;
    const seenSections = new Set<HTMLElement>();
    const sectionNames = new WeakMap<HTMLElement, string>();

    const trackInteraction = (eventName: string, properties?: Record<string, string>) => {
      if (recordingTimer === null) {
        posthog.startSessionRecording(true);
        recordingTimer = window.setTimeout(() => {
          posthog.stopSessionRecording();
          recordingTimer = null;
        }, recordingDurationMs);
      }

      posthog.capture(eventName, properties);
    };

    const onFocus = (event: FocusEvent) => {
      const field = event.target;
      if (!(field instanceof HTMLElement) || !field.matches("#waitlist input:not([type='checkbox']), #waitlist textarea")) return;

      trackInteraction("waitlist_field_focused", { field: field.id.replace("waitlist-", "") });
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest("#waitlist button[type='submit']")) {
        trackInteraction("waitlist_submit_clicked");
      } else if (event.target.closest("a[href='#waitlist']")) {
        trackInteraction("waitlist_cta_clicked");
      }
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const section = entry.target as HTMLElement;
        if (!entry.isIntersecting || window.scrollY < 16 || seenSections.has(section)) continue;

        seenSections.add(section);
        trackInteraction("section_viewed", { section: sectionNames.get(section) ?? "unknown" });
      }
    }, { rootMargin: "-35% 0px -35% 0px" });

    document.querySelectorAll<HTMLElement>("main section, main > [id]:not(#privacy)").forEach((section, index) => {
      sectionNames.set(section, section.id || section.dataset.story || `section-${index + 1}`);
      sectionObserver.observe(section);
    });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);

    return () => {
      sectionObserver.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick);
      if (recordingTimer !== null) {
        window.clearTimeout(recordingTimer);
        posthog.stopSessionRecording();
      }
    };
  }, []);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!isProduction || !posthogKey || !posthogHost) return children;

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      <PostHogInteractionTracking />
      {children}
    </PHProvider>
  );
}
