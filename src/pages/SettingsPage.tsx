import PageContainer from "../components/layout/PageContainer";
import ChangeTheme from "../components/pages/SettingsPage/ChangeTheme";
import SettingsItem from "../components/pages/SettingsPage/SettingsItem";

const SettingsPage = () => {
  return (
    <PageContainer title="Settings">
      <hr />
      <SettingsItem title="Change Language">
        <p>Change lang</p>
      </SettingsItem>
      <SettingsItem title="Change Theme">
        <ChangeTheme />
      </SettingsItem>
    </PageContainer>
  );
};

export default SettingsPage;
