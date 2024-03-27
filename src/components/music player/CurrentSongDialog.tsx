import "../../styles/music player/CurrentSongDialog.css";
import { useEffect, useRef, useState } from "react";
import CurrentSongDialogContent from "./CurrentSongDialogContent";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { ISong } from "../../interfaces/ISong";

const CurrentSongDialog = (props: { currentSongData: ISong | null }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const songDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDialogOpen) {
        setDialogState(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDialogOpen]);

  const setDialogState = (value: boolean) => {
    setIsDialogOpen(value);

    if (value) {
      songDialogRef.current?.showModal();
    } else {
      songDialogRef.current?.close();
    }
  };

  return (
    <div className="current-song-dialog-container">
      <dialog ref={songDialogRef} className="current-song-dialog">
        <CurrentSongDialogContent
          currentSongData={props.currentSongData}
          closeDialog={() => setDialogState(false)}
        />
      </dialog>
      <SimpleButton
        showTitle={false}
        title="Open song info"
        icon={SVG_ICONS.THREE_DOTS}
        onClickItem={() => setDialogState(true)}
      />
    </div>
  );
};

export default CurrentSongDialog;
