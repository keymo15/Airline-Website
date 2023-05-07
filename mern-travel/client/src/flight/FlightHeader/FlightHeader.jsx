import { faLocationDot, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FlightHeader.css";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link, useNavigate } from "react-router-dom";

const FlightHeader = ({ type, city }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setOrigin(city);
  }, [city]);

  const handleSearch = () => {
    navigate("/flight-booking/flights", { state: { origin, destination } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="headerTitle">
              <h1>Where adventure takes flight</h1>
              <div className="book-switch">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span>Book Hotels!</span>
                </Link>
              </div>
            </div>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free account
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />

                <input
                  type="text"
                  placeholder="Enter Origin Location"
                  className="headerSearchInput"
                  value={origin || ""}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlane} className="headerIcon" />

                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="headerSearchInput"
                  value={destination || ""}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlightHeader;
