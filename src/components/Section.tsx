interface SectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  export default function Section({ title, children }: SectionProps) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primaryPurple">{title}</h2>
        <div className="prose max-w-none">{children}</div>
      </section>
    );
  }