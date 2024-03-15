import { ReactNode } from "react";
import "../../../styles/pages/SettingsPage/SettingsItem.css";
import SVGIcon from "../../shared/SVGIcon";

const SettingsItem = (props: {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}) => {
  return (
    <div className="settings-item-container">
      <div className="flex centered" style={{ gap: "15px" }}>
        <SVGIcon icon={props.icon} />
        <div className="flex flex-column" style={{ gap: "5px" }}>
          <p className="settings-item-title">{props.title}</p>
          <p className="settings-item-description">{props.description}</p>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default SettingsItem;
