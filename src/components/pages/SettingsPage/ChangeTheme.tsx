import { useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { useTranslation } from "react-i18next";

const ChangeTheme = () => {
  const [t] = useTranslation("global");
  const { selectedTheme, checkSavedTheme, changeTheme } = useTheme();

  useEffect(() => {
    checkSavedTheme();
  }, []);

  return (
    <div className="theme-select">
      <label htmlFor="select-theme" hidden>
        {t("SETTINGS-PAGE.CHANGE-THEME-DESC")}
      </label>
      <select
        id="select-theme"
        name="select-app-theme"
        className="standard-select"
        value={selectedTheme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="dark">{t("SETTINGS-PAGE.CHANGE-THEME-DARK")}</option>
        <option value="light">{t("SETTINGS-PAGE.CHANGE-THEME-LIGHT")}</option>
      </select>
    </div>
  );
};

export default ChangeTheme;
