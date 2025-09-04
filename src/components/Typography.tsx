export function H1({ children }: { children: React.ReactNode }) {
    return <h1 className="text-4xl font-bold text-primaryPurple">{children}</h1>;
  }
  
  export function H2({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl font-semibold text-secondaryMagenta">{children}</h2>;
  }
  
  export function Body({ children }: { children: React.ReactNode }) {
    return <p className="text-base leading-relaxed text-gray-700">{children}</p>;
  }