import { calculateDuration } from "../../functions/CalculateDuration";
import useFetch from "../../hooks/useFetch";
import "./AllFlights.css";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";

const AllFlights = () => {
  //   const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  const { data, loading } = useFetch("http://localhost:8080/api/flights");

  // if(cityData.length < 1){
  //   cityData = data
  // }

  return (
    <div className="flightContainer">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
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
                <span>
                  {Array.from({ length: item?.stops }, () =>
                    faker.address.countryCode('alpha-3')
                  ).join(" - ")}
                </span>
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

export default AllFlights;
