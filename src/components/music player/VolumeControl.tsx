import "../../styles/music player/VolumeControl.css";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";

const VolumeControl = () => {
  const { changePlayerVolume } = useMusicPlayer();
  const [volumen, setVolumen] = useState("100");
  const [isVolumePanelOpen, setIsVolumePanelOpen] = useState(false);

  useEffect(() => {
    changePlayerVolume(Number(volumen) / 100);
  }, [volumen]);

  return (
    <div className="volume-control-container">
      {isVolumePanelOpen && (
        <div className="volume-panel">
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
            onBlur={isVolumePanelOpen && (() => setIsVolumePanelOpen(false))}
          />
          <p>{volumen}</p>
        </div>
      )}
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
            : () => setIsVolumePanelOpen(true)
        }
      />
    </div>
  );
};

export default VolumeControl;
