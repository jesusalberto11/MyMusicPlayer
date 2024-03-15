import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const [selectedLang, setSelectedLang] = useState<string>("");
  const [_t, i18n] = useTranslation("global");

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  const checkSavedLanguage = () => {
    if (localStorage.getItem("lang")) {
      const lang = localStorage.getItem("lang") || "es";
      changeLanguage(lang);
    }
  };

  const changeLanguage = (value: string) => {
    setSelectedLang(value);
    localStorage.setItem("lang", value);
  };

  return {
    selectedLang,
    checkSavedLanguage,
    changeLanguage,
  };
};
