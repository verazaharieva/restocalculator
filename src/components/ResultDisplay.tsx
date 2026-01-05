import { Euro, AlertCircle } from "lucide-react";

interface ResultDisplayProps {
  changeInLeva: number | null;
  changeInEuro: number | null;
  error: string | null;
  hint: string;
  title: string;
  currencyBGN: string;
}
const ResultDisplay = ({
  changeInLeva,
  changeInEuro,
  error,
  hint,
  title,
  currencyBGN,
}: ResultDisplayProps) => {
  if (error) {
    return (
      <div className="animate-pop bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 text-destructive">
          <AlertCircle className="w-6 h-6" />
          <span className="text-lg font-bold">{error}</span>
        </div>
      </div>
    );
  }

  if (changeInLeva === null || changeInEuro === null) {
    return (
      <div className="bg-muted/50 border-2 border-dashed border-border rounded-xl p-6 text-center">
       <p className="text-muted-foreground font-medium">
      {hint}
      </p>
      </div>
    );
  }

  return (
    <div className="animate-pop gradient-success rounded-xl p-6 text-center shadow-button">
      <p className="text-primary-foreground/80 text-sm font-semibold uppercase tracking-wide mb-1">
        {title}
      </p>
      <div className="flex items-center justify-center gap-2">
        <Euro className="w-8 h-8 text-primary-foreground" />
        <span className="text-4xl font-extrabold text-primary-foreground">
          {changeInEuro.toFixed(2)}
        </span>
      </div>
      <p className="text-primary-foreground/70 text-sm font-medium mt-2">
        ({changeInLeva.toFixed(2)} {currencyBGN})
      </p>
    </div>
  );
};

export default ResultDisplay;
