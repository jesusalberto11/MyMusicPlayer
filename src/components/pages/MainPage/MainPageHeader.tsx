import "../../../styles/pages/MainPageHeader.css";

const MainPageHeader = (props: { filterSongList: any }) => {
  return (
    <div className="main-page-header-container">
      <input
        type="search"
        onChange={(e) => props.filterSongList(e.target.value.toLowerCase())}
        className="searchbar"
        placeholder="Search a song..."
      />
      <div>
        <button type="button">Pick a random song</button>
        <button type="button">order by A-Z</button>
        <button type="button">FILTER BY genre</button>
      </div>
    </div>
  );
};

export default MainPageHeader;
