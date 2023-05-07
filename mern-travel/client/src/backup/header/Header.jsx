import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchBar from "../SearchBar/SearchBar";

const Header = ({ type }) => {
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Where adventure takes flight</h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free AirBook account
            </p>
            <SearchBar />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
