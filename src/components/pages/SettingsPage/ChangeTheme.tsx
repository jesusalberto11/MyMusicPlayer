import { useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";

const ChangeTheme = () => {
  const { selectedTheme, checkSavedTheme, changeTheme } = useTheme();

  useEffect(() => {
    checkSavedTheme();
  }, []);

  return (
    <div className="theme-select">
      <label htmlFor="select-theme" hidden>
        Select app theme
      </label>
      <select
        id="select-theme"
        name="select-app-theme"
        className="standard-select"
        value={selectedTheme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        <option value="dark">Dark (Recomended)</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ChangeTheme;
