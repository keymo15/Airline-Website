import { faLocationDot, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Link, useLocation } from "react-router-dom";
import {  useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./FlightList.css";

const FlightList = () => {
  const location = useLocation();
  const [origin, setOrigin] = useState(location.state.origin);
  const [destination, setDestination] = useState(location.state.destination);

  const { data, loading, reFetch } = useFetch(
    `http://localhost:8080/api/flights?origin=${origin}&destination=${destination}`
  );

  const handleSearch = () => {
    reFetch();
  };

  const calculateDuration = (start, end) => {
    const startHours = parseInt(start.split(":")[0]);
    const startMinutes = parseInt(start.split(":")[1].split(" ")[0]);
    const startPeriod = start.split(" ")[1];
    const startTotalMinutes =
      ((startHours % 12) + (startPeriod === "PM" ? 12 : 0)) * 60 + startMinutes;

    const endHours = parseInt(end.split(":")[0]);
    const endMinutes = parseInt(end.split(":")[1].split(" ")[0]);
    const endPeriod = end.split(" ")[1];
    const endTotalMinutes =
      ((endHours % 12) + (endPeriod === "PM" ? 12 : 0)) * 60 + endMinutes;

    const durationInMinutes = Math.abs(endTotalMinutes - startTotalMinutes);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hr ${minutes} min`;
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flight-listContainer">
        <div className="listWrapper">
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
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <Link
                    className="flightObject"
                    target="_blank"
                    key={item.flight_number}
                    to={item.redirect_url}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={item?.company_image_url}
                      alt=""
                      className="flightLogo"
                    />
                    <div className="flightName">
                      <span>{item.company_name}</span>
                    </div>
                    <div className="flightDuration">
                      <span>
                        {item.departure_time} - {item.arrival_time}
                      </span>
                    </div>
                    <div className="flightLocations">
                      <span>
                        {calculateDuration(
                          item.departure_time,
                          item.arrival_time
                        )}
                      </span>
                      <span>
                        {item.origin} - {item.destination}
                      </span>
                    </div>
                    <div className="flightStops">
                      <span>{item.stops} Stops</span>
                      <span>CAD, AMD, MMB</span>
                    </div>
                    <div className="flightPrice">
                      <span>${item.ticket_price}</span>
                      <span>Round Trip</span>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightList;
