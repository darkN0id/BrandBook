import { useEffect, useState } from "react";

interface NavProps {
  sections: { id: string; title: string }[];
}

export default function Navigation({ sections }: NavProps) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden lg:flex flex-col fixed right-6 top-24 space-y-3">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`transition-colors text-sm font-medium hover:text-secondaryMagenta ${
            active === s.id ? "text-primaryPurple" : "text-gray-400"
          }`}
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}