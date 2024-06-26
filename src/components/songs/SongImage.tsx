import "../../styles/pages/MainPage.css";
import noCoverImg from "../../assets/no-cover.png";

const SongImage = (props: { imageSrc: string | null; height?: string }) => {
  const checkHeight = () => {
    return props.height ? `${props.height}px` : "50px";
  };
  return (
    <img
      src={props?.imageSrc ? props?.imageSrc : noCoverImg}
      alt="song-cover"
      className="song-list-item-img"
      style={{ height: checkHeight(), width: "auto" }}
      loading="lazy"
    />
  );
};

export default SongImage;
