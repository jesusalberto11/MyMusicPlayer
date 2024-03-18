import "../../styles/music player/VolumeControl.css";
import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";

const VolumeControl = () => {
  const volumePanelRef = useRef<HTMLDialogElement | null>(null);
  const { changePlayerVolume } = useMusicPlayer();
  const [volumen, setVolumen] = useState("100");
  const [isVolumePanelOpen, setIsVolumePanelOpen] = useState(false);

  useEffect(() => {
    changePlayerVolume(Number(volumen) / 100);
  }, [volumen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVolumePanelOpen) {
        closeVolumePanel();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVolumePanelOpen]);

  const openVolumePanel = () => {
    volumePanelRef.current?.showModal();
    setIsVolumePanelOpen(true);
  };

  const closeVolumePanel = () => {
    volumePanelRef.current?.close();
    setIsVolumePanelOpen(false);
  };

  return (
    <div className="volume-control-container">
      <div className="dialog-container">
        {isVolumePanelOpen && (
          <dialog
            ref={volumePanelRef}
            open={isVolumePanelOpen}
            className="volume-panel"
          >
            <label htmlFor="vol" hidden>
              Volume (between 0 and 100):
            </label>
            <input
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="100"
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
              onBlur={isVolumePanelOpen && (() => closeVolumePanel())}
            />
            <p>{volumen}</p>
          </dialog>
        )}
      </div>
      <SimpleButton
        showTitle={false}
        title="Open volume control"
        icon={
          Number(volumen) >= 50
            ? SVG_ICONS.VOLUME_UP
            : Number(volumen) == 0
            ? SVG_ICONS.VOLUME_MUTE
            : SVG_ICONS.VOLUME_LOW
        }
        onClickItem={
          isVolumePanelOpen
            ? () => setIsVolumePanelOpen(false)
            : () => openVolumePanel()
        }
      />
    </div>
  );
};

export default VolumeControl;
