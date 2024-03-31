import "../../../styles/pages/MusicPlayerPage/SongLyrics.css";
import { ILyrics } from "../../../interfaces/ILyrics";
import { useState } from "react";
import SimpleButton from "../../shared/SimpleButton";
import { SVG_ICONS } from "../../../helpers/svgIcons";

const SongLyrics = (props: { lyrics: ILyrics[] | null }) => {
  const [isLyricsPanelOpen, setIsLyricsPanelOpen] = useState(false);

  return (
    <>
      {props?.lyrics?.length !== 0 &&
        (isLyricsPanelOpen ? (
          <div className="song-lyrics">
            <SimpleButton
              showTitle={false}
              title="Close Lyrics panel"
              icon={SVG_ICONS.CLOSE}
              onClickItem={() => setIsLyricsPanelOpen(false)}
            />
            {props?.lyrics?.map((l: ILyrics, index: number) => (
              <div key={index}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: l.text.replace(/\r\n/g, "<br />"),
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <SimpleButton
            showTitle={true}
            title="Open Lyrics"
            icon={SVG_ICONS.MUSIC_NOTE}
            onClickItem={() => setIsLyricsPanelOpen(true)}
          />
        ))}
    </>
  );
};

export default SongLyrics;
