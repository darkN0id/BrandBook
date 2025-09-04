import React from "react";
import Navigation from "./Navigation";
import Section from "./Section";
import { motion } from "framer-motion";

type LayoutProps = {
  sections: { id: string; title: string; content: React.ReactNode }[];
};

export default function Layout({ sections }: LayoutProps) {
  return (
    <div className="flex">
      {/* Left Content */}
      <main className="flex-1 p-6 space-y-24 max-w-4xl mx-auto">
        {sections.map((s) => (
          <motion.div
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Section title={s.title}>{s.content}</Section>
          </motion.div>
        ))}
      </main>

      {/* Right Sticky Navigation */}
      <Navigation sections={sections} />
    </div>
  );
}