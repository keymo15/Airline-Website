import { calculateDuration } from "../../functions/CalculateDuration";
import useFetch from "../../hooks/useFetch";
import "./FeaturedFlights.css";
import { Link } from "react-router-dom";

const FeaturedFlights = ({ city }) => {
  //   const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  const { data, loading } = useFetch("http://localhost:8080/api/flights");
  const cityData = data.filter((item) => item?.origin === city);
  console.log(cityData);

  if (cityData.length > 0) {
    console.log("true");
  }

  return (
    <div className="flightContainer">
      {loading ? (
        "Loading"
      ) : (
        <>
          {cityData.map((item) => (
            <Link
              className="flightObject"
              target="_blank"
              key={item?.flight_number}
              to={item?.redirect_url}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={item?.company_image_url}
                alt=""
                className="flightLogo"
              />
              <div className="flightName">
                <span>{item?.company_name}</span>
              </div>
              <div className="flightDuration">
                <span>
                  {item?.departure_time} - {item?.arrival_time}
                </span>
              </div>
              <div className="flightLocations">
                <span>
                  {calculateDuration(item?.departure_time, item?.arrival_time)}
                </span>
                <span>
                  {item?.origin} - {item?.destination}
                </span>
              </div>
              <div className="flightStops">
                <span>{item?.stops} Stops</span>
                <span>CAD, AMD, MMB</span>
              </div>
              <div className="flightPrice">
                <span>${item?.ticket_price}</span>
                <span>Round Trip</span>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedFlights;
