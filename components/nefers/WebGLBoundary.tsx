"use client";

import { Component, type ReactNode } from "react";

// WebGL açılamazsa (eski GPU, tarayıcı engeli, context loss) 3D sahne sessizce düşer; sayfa çalışmaya devam eder.
export default class WebGLBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D scene disabled:", error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
