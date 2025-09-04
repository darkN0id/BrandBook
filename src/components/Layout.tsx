// /src/components/Layout.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { brandContent } from "../data/brandContent";

export default function Layout() {
  const [activeId, setActiveId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Track scroll progress (0 → 1)
  const { scrollYProgress } = useScroll();
  
  // Create a smoother scroll progress value
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  // Map scroll progress to circle position (0 → total path length)
  const [pathLength, setPathLength] = useState(0);
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const circlePos = useTransform(smoothScrollProgress, (latest) =>
    pathRef.current?.getPointAtLength(latest * pathLength)
  );
  
  const circleX = useTransform(circlePos, (pos) => pos?.x ?? 0);
  const circleY = useTransform(circlePos, (pos) => pos?.y ?? 0);

  // Calculate section positions for markers
  const [sectionPositions, setSectionPositions] = useState<{id: string, position: number}[]>([]);
  useEffect(() => {
    const calculatePositions = () => {
      const positions = brandContent.map((section, index) => {
        // Distribute sections evenly along the path
        const position = (index / (brandContent.length - 1)) * pathLength;
        return { id: section.id, position };
      });
      setSectionPositions(positions);
    };
    
    if (pathLength > 0) {
      calculatePositions();
    }
  }, [pathLength, brandContent]);

  // Find the closest section to the current scroll position
  const closestSection = useTransform(smoothScrollProgress, (latest) => {
    const currentPosition = latest * pathLength;
    if (!sectionPositions.length) return "";
    
    const closest = sectionPositions.reduce((prev, curr) => {
      return Math.abs(curr.position - currentPosition) < Math.abs(prev.position - currentPosition) 
        ? curr : prev;
    });
    
    return closest.id;
  });

  // Update active section based on scroll
  useEffect(() => {
    const updateActiveSection = () => {
      setActiveId(closestSection.get());
    };
    
    const unsubscribe = closestSection.on("change", updateActiveSection);
    return () => unsubscribe();
  }, [closestSection]);

  // Animate path drawing effect
  const pathProgress = useTransform(smoothScrollProgress, (value) => value * pathLength);
  
  // Create motion values for circle radius
  const activeCircleRadius = useTransform(() => hoveredId ? 14 : 10);
  const innerCircleRadius = useTransform(() => hoveredId ? 8 : 4);

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
      {/* Main content */}
      <main className="w-4/5 p-4 space-y-20 max-w-5xl mx-auto">
        {brandContent.map((section) => (
          <motion.section
            id={section.id}
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <div>{section.content}</div>
          </motion.section>
        ))}
      </main>

      {/* Sticky nav with scroll indicator */}
      <nav 
        ref={navRef}
        className="w-1/5 border-l border-gray-200 sticky top-0 h-screen p-6 bg-white shadow-lg relative flex flex-col items-end"
      >
        {/* SVG Path */}
        <svg
          className="absolute top-0 right-1/7 transform -translate-x-1/2"
          width="100"
          height="100%"
          viewBox="0 0 100 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background path (full path) */}
          <path
            d="M50 0 C20 200, 80 400, 50 600 C20 800, 80 1000, 50 1200"
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          
          {/* Animated progress path */}
          <motion.path
            ref={pathRef}
            d="M50 0 C20 200, 80 400, 50 600 C20 800, 80 1000, 50 1200"
            stroke="#5C3C80"
            strokeWidth="4"
            fill="none"
            strokeDasharray={pathLength}
            strokeDashoffset={useTransform(pathProgress, (latest) => pathLength - latest)}
            style={{
              pathLength: pathProgress,
            }}
          />
          
          {/* Section markers */}
          {sectionPositions.map(({ id, position }) => {
            const point = pathRef.current?.getPointAtLength(position);
            return (
              <motion.circle
                key={id}
                cx={point?.x || 0}
                cy={point?.y || 0}
                                 r={activeId === id || hoveredId === id ? 6 : 4}
                fill="#5C3C80"
                className="cursor-pointer"
                whileHover={{ scale: 1.5 }}
                onHoverStart={() => setHoveredId(id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => {
                  const element = document.getElementById(id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            );
          })}
          
          {/* Moving circle */}
          {pathLength > 0 && (
            <motion.g
              style={{
                x: circleX,
                y: circleY,
              }}
            >
                             <motion.circle
                 r={activeCircleRadius}
                 fill="#5C3C80"
                 animate={{
                   scale: [1, 1.2, 1],
                 }}
                 transition={{
                   duration: 2,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               />
               <motion.circle
                 r={innerCircleRadius}
                 fill="white"
                 opacity={0.8}
               />
            </motion.g>
          )}
        </svg>

        {/* Nav links */}
        <ul className="relative z-10 flex flex-col justify-center items-end h-full space-y-12 text-right list-none">
          {links.map((link) => (
            <motion.li 
              key={link.id}
              onHoverStart={() => setHoveredId(link.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.a
                href={`#${link.id}`}
                className={`font-semibold text-2xl transition-colors duration-200 relative block ${
                  activeId === link.id ? "text-black" : "text-gray-400 hover:text-black"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(link.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ x: -5 }}
              >
                {activeId === link.id && (
                  <motion.span
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
                {link.label}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}