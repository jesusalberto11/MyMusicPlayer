import { useState } from "react";

export const useTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const checkSavedTheme = () => {
    if (localStorage.getItem("theme")) {
      const theme = localStorage.getItem("theme") || "dark";
      changeTheme(theme);
    }
  };

  const changeTheme = (value: string) => {
    if (value === "light") {
      setSelectedTheme("light");

      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }

    if (value === "dark") {
      setSelectedTheme("dark");

      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return {
    selectedTheme,
    checkSavedTheme,
    changeTheme,
  };
};
