import type { Metadata } from "next";
import Footer from "@/components/Footer";
import NefersExperience from "@/components/nefers/NefersExperience";
import { getSeatsLeft } from "@/lib/waitlist";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Meet the Nefers | Jennefer",
  description: "Pixel, Loop, Byte, and Patch: the tiny agents inside Jennefer that plan, build, and review your code.",
  openGraph: {
    title: "Meet the Nefers | Jennefer",
    description: "Pixel, Loop, Byte, and Patch: the tiny agents inside Jennefer that plan, build, and review your code.",
    url: "https://jennefer.dev/nefers",
  },
};

export default async function NefersPage() {
  const seatsLeft = await getSeatsLeft();
  return (
    <main id="main">
      <NefersExperience isLocked={seatsLeft === 0}>
        <Footer homeLinks />
      </NefersExperience>
    </main>
  );
}
