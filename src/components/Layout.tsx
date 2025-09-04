// /src/components/Layout.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brandContent } from "../data/brandContent";

export default function Layout() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
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

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "foundation", label: "1. Foundation" },
    { id: "visual", label: "2. Visual Identity" },
    { id: "communication", label: "3. Communication" },
    { id: "philosophy", label: "4. Philosophy" },
    { id: "standards", label: "5. Standards" },
    { id: "tools", label: "6. Tools" },
    { id: "inaction", label: "7. In Action" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Main content area (80%) */}
      <main className="w-4/5 p-8 space-y-20 max-w-5xl mx-auto">
        {brandContent.map((section) => (
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
  <ul className="flex flex-col justify-center items-end h-full space-y-12 text-right list-none">
    {links.map((link) => (
      <li key={link.id}>
        <a
          href={`#${link.id}`}
          className={`font-semibold text-2xl no-underline hover:no-underline transition-colors duration-200 ${
            activeId === link.id
              ? "text-text"
              : "text-text hover:text-text"
          }`}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>



    </div>
  );
}
