import { ReactNode } from "react";
import "../../../styles/pages/SettingsPage/SettingsItem.css";

const SettingsItem = (props: { title: string; children: ReactNode }) => {
  return (
    <div className="settings-item-container">
      <p className="settings-item-title">{props.title}</p>
      {props.children}
    </div>
  );
};

export default SettingsItem;
