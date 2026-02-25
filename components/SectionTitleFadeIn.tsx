"use client";

import { MotionFadeIn } from "@/components/AnimatedNewsSection";

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionTitleFadeIn({ title, subtitle }: Props) {
  return (
    <MotionFadeIn>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </MotionFadeIn>
  );
}
