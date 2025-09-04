export default function Checklist({ items }: { items: string[] }) {
    return (
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-secondaryMagenta"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }