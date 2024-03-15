import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../hooks/useLanguage";

const ChangeLanguage = () => {
  const [t] = useTranslation("global");
  const { selectedLang, checkSavedLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    checkSavedLanguage();
  }, []);

  return (
    <div className="theme-select">
      <label htmlFor="select-theme" hidden>
        {t("SETTINGS-PAGE.CHANGE-LANG-DESC")}
      </label>
      <select
        id="select-theme"
        name="select-app-theme"
        className="standard-select"
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="es"> {t("SETTINGS-PAGE.CHANGE-LANG-ES")}</option>
        <option value="en"> {t("SETTINGS-PAGE.CHANGE-LANG-EN")}</option>
      </select>
    </div>
  );
};

export default ChangeLanguage;
