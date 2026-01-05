import { useState } from "react";
import { Calculator, RotateCcw, Coins, Banknote, RefreshCw, Euro } from "lucide-react";
import CalculatorInput from "@/components/CalculatorInput";
import ResultDisplay from "@/components/ResultDisplay";
import { useLanguage } from "../language";

const DEFAULT_RATE = "1.95583";

type PriceCurrency = "EUR" | "BGN";
const texts = {
  bg: {
    title: "Калкулатор Ресто",
    price: "Цена",
    paid: "Платена сума",
    rate: "Курс EUR/BGN",
    calculate: "Изчисли",
    reset: "Нулирай",
  },
  en: {
    title: "Change Calculator",
    price: "Price",
    paid: "Amount paid",
    rate: "Exchange rate EUR/BGN",
    calculate: "Calculate",
    reset: "Reset",
  },
};


const Index = () => {
  const { lang, setLang } = useLanguage();
  const [price, setPrice] = useState("");
  const [priceCurrency, setPriceCurrency] = useState<PriceCurrency>("EUR");
  const [paid, setPaid] = useState("");
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [changeInLeva, setChangeInLeva] = useState<number | null>(null);
  const [changeInEuro, setChangeInEuro] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const priceNum = parseFloat(price);
    const paidNum = parseFloat(paid);
    const rateNum = parseFloat(rate);

    // Validation
    if (isNaN(priceNum) || isNaN(paidNum)) {
      setError("Моля въведете валидни стойности");
      setChangeInLeva(null);
      setChangeInEuro(null);
      return;
    }

    if (priceNum < 0 || paidNum < 0) {
      setError("Стойностите не могат да бъдат отрицателни");
      setChangeInLeva(null);
      setChangeInEuro(null);
      return;
    }

    if (isNaN(rateNum) || rateNum <= 0) {
      setError("Невалиден валутен курс");
      setChangeInLeva(null);
      setChangeInEuro(null);
      return;
    }

    // Convert price to Leva if it's in Euro
    const priceInLeva = priceCurrency === "EUR" ? priceNum * rateNum : priceNum;

    if (paidNum < priceInLeva) {
      setError("Недостатъчна сума");
      setChangeInLeva(null);
      setChangeInEuro(null);
      return;
    }

    const change = paidNum - priceInLeva;
    const euroChange = change / rateNum;

    setError(null);
    setChangeInLeva(change);
    setChangeInEuro(euroChange);
  };

  const reset = () => {
    setPrice("");
    setPriceCurrency("EUR");
    setPaid("");
    setRate(DEFAULT_RATE);
    setChangeInLeva(null);
    setChangeInEuro(null);
    setError(null);
  };

  return (
    <>
  <div style={{ textAlign: "right", marginBottom: 8 }}>
    <button onClick={() => setLang("bg")} disabled={lang === "bg"}>
      BG
    </button>
    {" | "}
    <button onClick={() => setLang("en")} disabled={lang === "en"}>
      EN
    </button>
  </div>

    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 gradient-warm rounded-lg flex items-center justify-center shadow-button">
              <Calculator className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-extrabold text-foreground">
          {texts[lang].title}
         </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6 animate-slide-up">
        {/* Input Fields */}
        <div className="bg-card rounded-xl p-5 shadow-soft space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {texts[lang].price}
              </label>
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setPriceCurrency("EUR")}
                  className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-200 ${
                    priceCurrency === "EUR"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  €
                </button>
                <button
                  onClick={() => setPriceCurrency("BGN")}
                  className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-200 ${
                    priceCurrency === "BGN"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  лв.
                </button>
              </div>
            </div>
            <CalculatorInput
              label=""
              value={price}
              onChange={setPrice}
              placeholder="0.00"
              suffix={priceCurrency === "EUR" ? "€" : "лв."}
              icon={priceCurrency === "EUR" ? <Euro className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
            />
          </div>

          <CalculatorInput
           label={texts[lang].paid}
            value={paid}
            onChange={setPaid}
            placeholder="0.00"
            suffix="лв."
            icon={<Banknote className="w-5 h-5" />}
          />

          <CalculatorInput
            label={texts[lang].rate}
            value={rate}
            onChange={setRate}
            placeholder="1.95583"
            icon={<RefreshCw className="w-5 h-5" />}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={reset}
            className="h-14 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-lg rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {texts[lang].reset}
          </button>
          <button
            onClick={calculate}
            className="h-14 gradient-warm hover:opacity-90 text-primary-foreground font-bold text-lg rounded-lg shadow-button transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            {texts[lang].calculate}
          </button>
        </div>

        {/* Result Display */}
        <ResultDisplay
          changeInLeva={changeInLeva}
          changeInEuro={changeInEuro}
          error={error}
        />

        {/* Install Hint */}
        <p className="text-center text-sm text-muted-foreground">
          Добавете приложението на Home Screen за бърз достъп
        </p>
      </main>
    </div>
      </>
  );
};

export default Index;
