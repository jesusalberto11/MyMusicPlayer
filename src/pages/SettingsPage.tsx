import { useTranslation } from "react-i18next";
import PageContainer from "../components/layout/PageContainer";
import ChangeTheme from "../components/pages/SettingsPage/ChangeTheme";
import SettingsItem from "../components/pages/SettingsPage/SettingsItem";
import { SVG_ICONS } from "../helpers/svgIcons";

const SettingsPage = () => {
  const [t] = useTranslation("global");

  return (
    <PageContainer title={t("SETTINGS-PAGE.SETTINGS-PAGE-TITLE")}>
      <hr />
      <SettingsItem
        title={t("SETTINGS-PAGE.CHANGE-LANG-TITLE")}
        description={t("SETTINGS-PAGE.CHANGE-LANG-DESC")}
        icon={SVG_ICONS.THEME}
      >
        <p>Change lang</p>
      </SettingsItem>
      <SettingsItem
        title={t("SETTINGS-PAGE.CHANGE-THEME-TITLE")}
        description={t("SETTINGS-PAGE.CHANGE-THEME-DESC")}
        icon={SVG_ICONS.TRANSLATE}
      >
        <ChangeTheme />
      </SettingsItem>
    </PageContainer>
  );
};

export default SettingsPage;
