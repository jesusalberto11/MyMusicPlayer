import PageContainer from "../components/layout/PageContainer";
import ChangeTheme from "../components/pages/SettingsPage/ChangeTheme";
import SettingsItem from "../components/pages/SettingsPage/SettingsItem";
import { SVG_ICONS } from "../helpers/svgIcons";

const SettingsPage = () => {
  return (
    <PageContainer title="Settings">
      <hr />
      <SettingsItem
        title="Language"
        description="Cambia el idioma de la aplicación."
        icon={SVG_ICONS.THEME}
      >
        <p>Change lang</p>
      </SettingsItem>
      <SettingsItem
        title="Theme"
        description="Cambia el lenguaje de la aplicación."
        icon={SVG_ICONS.TRANSLATE}
      >
        <ChangeTheme />
      </SettingsItem>
    </PageContainer>
  );
};

export default SettingsPage;
