import { ChangeEvent } from "react";

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

const CalculatorInput = ({
  label,
  value,
  onChange,
  placeholder = "0.00",
  suffix,
  icon,
}: CalculatorInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only valid positive numbers
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full h-16 text-xl font-bold
            bg-card border-2 border-border rounded-lg
            focus:border-primary focus:ring-4 focus:ring-primary/20
            outline-none transition-all duration-200
            placeholder:text-muted-foreground/40
            ${icon ? "pl-12" : "pl-4"} ${suffix ? "pr-14" : "pr-4"}
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default CalculatorInput;
