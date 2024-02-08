import "../../styles/pages/MainPage.css";
import noCoverImg from "../../assets/no-cover.png";

const SongImage = (props: { imageSrc: string; height?: string }) => {
  const checkHeight = () => {
    return props.height ? `${props.height}px` : "50px";
  };
  return (
    <img
      src={props?.imageSrc ? props?.imageSrc : noCoverImg}
      className="song-list-item-img"
      style={{ height: checkHeight() }}
    />
  );
};

export default SongImage;
