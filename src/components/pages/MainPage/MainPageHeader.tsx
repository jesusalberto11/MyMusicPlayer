import { useTranslation } from "react-i18next";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import "../../../styles/pages/MainPageHeader.css";
import SVGIcon from "../../shared/SVGIcon";

const MainPageHeader = (props: { filterSongList: any }) => {
  const [t] = useTranslation("global");

  return (
    <div className="main-page-header-container">
      <input
        type="search"
        onChange={(e) => props.filterSongList(e.target.value.toLowerCase())}
        className="searchbar"
        placeholder={t("MAIN-PAGE-HEADER.SEARCH-SONG")}
      />
      <div className="header-items-container">
        <div className="header-item">
          <label htmlFor="sort">{t("MAIN-PAGE-HEADER.SORT-BY")}</label>
          <select id="sort">
            <option>A - Z</option>
            <option>{t("MAIN-PAGE-HEADER.SORT-BY-ARTIST")}</option>
            <option>{t("MAIN-PAGE-HEADER.SORT-BY-ALBUM")}</option>
            <option>{t("MAIN-PAGE-HEADER.SORT-BY-YEAR")}</option>
          </select>
        </div>
        <button className="random-button" type="button">
          <SVGIcon icon={SVG_ICONS.SHUFFLE} />
          {t("MAIN-PAGE-HEADER.PICK-RANDOM")}
        </button>
      </div>
    </div>
  );
};

export default MainPageHeader;
