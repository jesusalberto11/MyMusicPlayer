import { SVG_ICONS } from "../../../helpers/svgIcons";
import "../../../styles/pages/MainPageHeader.css";
import SVGIcon from "../../shared/SVGIcon";

const MainPageHeader = (props: { filterSongList: any }) => {
  return (
    <div className="main-page-header-container">
      <input
        type="search"
        onChange={(e) => props.filterSongList(e.target.value.toLowerCase())}
        className="searchbar"
        placeholder="Search a song..."
      />
      <div className="header-items-container">
        <div className="header-item">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort">
            <option>A - Z</option>
            <option>Artist</option>
            <option>Album</option>
            <option>Year</option>
          </select>
        </div>
        <button className="random-button" type="button">
          <SVGIcon icon={SVG_ICONS.SHUFFLE} />
          Pick a random song
        </button>
      </div>
    </div>
  );
};

export default MainPageHeader;
