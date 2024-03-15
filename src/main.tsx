import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_es from "./i18n/es/global.json";
import global_en from "./i18n/en/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);
