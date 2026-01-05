import { createContext, useContext } from "react";

export type Language = "bg" | "en";

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
}>({
  lang: "bg",
  setLang: () => {}
});

export const useLanguage = () => useContext(LanguageContext);
