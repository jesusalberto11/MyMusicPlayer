import "../../styles/shared/ConfirmDialog.css";
import { forwardRef, useImperativeHandle, useRef } from "react";
import SimpleButton from "./SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { useTranslation } from "react-i18next";

const ConfirmDialog = forwardRef((props: { action: Function }, ref) => {
  const [t] = useTranslation("global");
  const confirmDialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    openDialog,
  }));

  const openDialog = () => confirmDialogRef.current?.showModal();

  const doAction = () => {
    props.action();
    confirmDialogRef.current?.close();
  };

  return (
    <dialog ref={confirmDialogRef} className="simple-dialog">
      <div className="confirm-dialog-container">
        <p>{t("ACTIONS.CONFIRM-DIALOG-TEXT")}</p>
        <div className="confirm-buttons">
          <SimpleButton
            showTitle={true}
            title={t("ACTIONS.CONFIRM-DIALOG-ACTION")}
            icon={SVG_ICONS.TRASH}
            onClickItem={() => doAction()}
          />
          <SimpleButton
            showTitle={true}
            title={t("ACTIONS.NO-CONFIRM-DIALOG-ACTION")}
            icon={SVG_ICONS.ARROW_RIGHT}
            onClickItem={() => confirmDialogRef.current?.close()}
          />
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmDialog;
