import ColorChip from "../components/ColorChip";
import Checklist from "../components/Checklist";
import { Body, H2 } from "../components/Typography";
import AnimatedLogo from "../components/AnimatedLogo";

export const brandContent = [
  {
    id: "foundation",
    title: "1. Brand Foundation",
    content: (
      <>
        <Body>
          <strong>Mission:</strong> To bridge technology and human potential through innovative leadership, clear communication, and purposeful systems thinking.
        </Body>
        <Body>
          <strong>Vision:</strong> Becoming a transformative technical leader who shapes resilient, ethical, and future‑ready organizations.
        </Body>
        <Checklist
          items={[
            "Analytical Excellence",
            "Inclusive Innovation",
            "Authentic Leadership",
            "Continuous Learning",
            "Sustainable Impact",
          ]}
        />
      </>
    ),
  },
  {
    id: "visual",
    title: "2. Visual Identity System",
    content: (
      <>
        <H2>Logo</H2>
        <AnimatedLogo />
        <Body>
          The animated geometric logo symbolizes integration of systems, adaptability, and continuous evolution.
        </Body>

        <H2>Colors</H2>
        <ColorChip name="Primary Purple" hex="#5C3C80" />
        <ColorChip name="Secondary Magenta" hex="#96397C" />
        <ColorChip name="Pure White" hex="#FFFFFF" />
        <ColorChip name="Deep Charcoal" hex="#1E1E1E" />

        <H2>Typography</H2>
        <Body>
          Headers use <em>OriginTech</em> for a futuristic, technical aesthetic. Body text relies on system‑UI fonts for clarity and accessibility.
        </Body>
      </>
    ),
  },
  {
    id: "communication",
    title: "3. Communication Style",
    content: (
      <>
        <Body>
          Communication is structured, thoughtful, and empathetic. Written tone is clear, logical, and balanced with motivational framing.
        </Body>
        <Checklist
          items={[
            "Use active voice and precise language",
            "Support claims with reasoning or data",
            "Balance technical depth with accessibility",
            "Encourage curiosity and dialogue",
          ]}
        />
      </>
    ),
  },
  {
    id: "leadership",
    title: "4. Leadership Philosophy",
    content: (
      <>
        <Body>
          Leadership is seen as a system — aligning individual growth with organizational purpose. The philosophy combines strategic foresight, mentoring, and resilience.
        </Body>
        <Checklist
          items={[
            "Lead with curiosity and critical thinking",
            "Foster psychological safety and inclusivity",
            "Build scalable, adaptable processes",
            "Model lifelong learning",
            "Balance innovation with ethical responsibility",
          ]}
        />
      </>
    ),
  },
  {
    id: "standards",
    title: "5. Behavioral Standards",
    content: (
      <>
        <Body>
          Standards guide how values manifest in daily actions and professional relationships.
        </Body>
        <Checklist
          items={[
            "Maintain integrity in all decisions",
            "Actively seek diverse perspectives",
            "Provide constructive, actionable feedback",
            "Respect boundaries while encouraging growth",
            "Own mistakes and model accountability",
          ]}
        />
      </>
    ),
  },
  {
    id: "tools",
    title: "6. Tools & Mediums",
    content: (
      <>
        <Body>
          Tools amplify clarity, collaboration, and creativity. Preference is for lightweight, adaptable solutions.
        </Body>
        <Checklist
          items={[
            "Whiteboarding (Miro, Excalidraw) for systems mapping",
            "Notion/Obsidian for knowledge management",
            "GitHub for collaboration and transparency",
            "Figma for conceptual and visual prototyping",
            "Public speaking and workshops for influence",
          ]}
        />
      </>
    ),
  },
  {
    id: "application",
    title: "7. Brand in Action",
    content: (
      <>
        <Body>
          The brand translates into leadership presence, problem‑solving, and storytelling in professional spaces.
        </Body>
        <Checklist
          items={[
            "Present complex solutions with clarity and empathy",
            "Use storytelling to inspire collaboration",
            "Mentor juniors through structured growth frameworks",
            "Advocate for sustainable, ethical technology use",
            "Continuously evolve brand expression as context changes",
          ]}
        />
      </>
    ),
  },
];