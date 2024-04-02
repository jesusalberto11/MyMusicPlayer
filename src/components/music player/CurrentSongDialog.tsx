import { useRef } from "react";
import CurrentSongDialogContent from "./CurrentSongDialogContent";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { ISong } from "../../interfaces/ISong";

const CurrentSongDialog = (props: { currentSongData: ISong | null }) => {
  const songDialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <dialog ref={songDialogRef} className="simple-dialog">
        <CurrentSongDialogContent
          currentSongData={props.currentSongData}
          closeDialog={() => songDialogRef.current?.close()}
        />
      </dialog>
      <SimpleButton
        showTitle={false}
        title="Open song info"
        icon={SVG_ICONS.THREE_DOTS}
        onClickItem={() => songDialogRef.current?.showModal()}
      />
    </>
  );
};

export default CurrentSongDialog;
