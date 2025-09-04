// /src/components/Layout.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SectionType = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type LayoutProps = {
  sections: SectionType[];
};

export default function Layout({ sections }: LayoutProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex min-h-screen">
      {/* Main content area (80%) */}
      <main className="w-4/5 p-8 space-y-20 max-w-5xl mx-auto">
        {sections.map((section) => (
          <motion.section
            id={section.id}
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <div>{section.content}</div>
          </motion.section>
        ))}
      </main>

      {/* Sticky vertical navbar (20%) */}
      <nav className="w-1/5 border-l border-gray-200 sticky top-0 h-screen p-6 bg-white shadow-lg">
        <ul className="space-y-4 text-right">
          {sections.map((section, idx) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`font-semibold transition-colors duration-200 ${
                  activeId === section.id
                    ? "text-purple-600"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {idx + 1}. {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
