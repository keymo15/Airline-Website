import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = () => {
    // handle search here
  };

  const handleFromCityChange = async (query) => {
    setIsLoading(true);

    try {
      // make an API call to fetch airports that match the query
      const response = await fetch(
        `https://opensky-network.org/api/places?query=${query}`
      );
      const airports = await response.json();

      // extract airport names and set as options
      const airportNames = airports.map((airport) => airport.name);
      setOptions(airportNames);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleToCityChange = async (query) => {
    setIsLoading(true);

    try {
      // make an API call to fetch cities that match the query
      const response = await fetch(`api/cities?query=${query}`);
      const cities = await response.json();

      setOptions(cities);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <AsyncTypeahead
          id="fromCity"
          labelKey="name"
          isLoading={isLoading}
          onSearch={handleFromCityChange}
          options={options}
          placeholder="From"
          onChange={(selected) =>
            setFromCity(selected.length ? selected[0].name : "")
          }
        />
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <AsyncTypeahead
          id="toCity"
          labelKey="name"
          isLoading={isLoading}
          onSearch={handleToCityChange}
          options={options}
          placeholder="To"
          onChange={(selected) =>
            setToCity(selected.length ? selected[0].name : "")
          }
        />
      </div>
      <div className="headerSearchItem">{/* rest of your code */}</div>
    </div>
  );
};

export default SearchBar;
