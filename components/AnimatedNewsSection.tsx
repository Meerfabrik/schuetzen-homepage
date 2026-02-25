"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * Wrapper für sanftes Einblenden (z. B. Section-Header oder ganzer Block).
 */
export function MotionFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Grid-Container, dessen Kinder nacheinander (gestaffelt) einblenden.
 * Für News-Karten: jede Karte erscheint mit kleinem Delay.
 */
export function StaggerGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={(child as React.ReactElement)?.key ?? index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
