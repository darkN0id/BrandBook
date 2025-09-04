interface ColorChipProps {
    name: string;
    hex: string;
  }
  
  export default function ColorChip({ name, hex }: ColorChipProps) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: hex }}></div>
        <span className="text-sm font-medium">{name} — {hex}</span>
      </div>
    );
  }