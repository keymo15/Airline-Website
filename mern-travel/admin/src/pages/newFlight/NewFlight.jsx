import "./NewFlight.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { flightInputs, roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { calculateDuration } from "../../functions/CalculateDuration";

const airLines = [
  {
    company_name: "Delta Air Lines",
    company_image_url:
      "https://brandslogo.net/wp-content/uploads/2014/09/delta-air-lines-logo.png",
    redirect_url: "https://www.delta.com/",
  },
  {
    company_name: "American Airlines",
    company_image_url:
      "https://s21.q4cdn.com/616071541/files/multimedia-gallery/assets/Logos/american-airlines/THUMB-aa_aa__ahz_4cp_grd_pos.png",
    redirect_url: "https://www.aa.com/",
  },
  {
    company_name: "United Airlines",
    company_image_url:
      "https://logos-download.com/wp-content/uploads/2016/03/United_Airlines_logo_TM.png",
    redirect_url: "https://www.united.com/",
  },
  {
    company_name: "Southwest Airlines",
    company_image_url:
      "https://logotaglines.com/wp-content/uploads/2022/01/Southwest-Airlines-Logo-Tagline-Slogan-Founder-Owner-Motto-480x480.jpg",
    redirect_url: "https://www.southwest.com/",
  },
  {
    company_name: "JetBlue Airways",
    company_image_url:
      "https://www.jetblue.com/magnoliapublic/dam/ui-assets/imagery/info-assets/logos-misc/JetBlue-og-image.jpg",
    redirect_url: "https://www.jetblue.com/",
  },
  {
    company_name: "Emirates",
    company_image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png",
    redirect_url: "https://www.emirates.com/",
  },
  {
    company_name: "Qatar Airways",
    company_image_url:
      "https://logowik.com/content/uploads/images/541_qatarairways.jpg",
    redirect_url: "https://www.qatarairways.com/",
  },
  {
    company_name: "British Airways",
    company_image_url:
      "https://cdn.freebiesupply.com/logos/large/2x/british-airways-01-logo-png-transparent.png",
    redirect_url: "https://www.britishairways.com/",
  },
  {
    company_name: "Lufthansa",
    company_image_url:
      "https://www.lufthansa.com/etc/designs/dcep/logo-lh-og.jpg",
    redirect_url: "https://www.lufthansa.com/",
  },
  {
    company_name: "Air France",
    company_image_url:
      "https://logos-world.net/wp-content/uploads/2020/03/Air-France-Logo-1976-1990.jpg",
    redirect_url: "https://www.airfrance.us/",
  },
  {
    company_name: "Air India",
    company_image_url:
      "https://logos-world.net/wp-content/uploads/2023/01/Air-India-Logo.png",
    redirect_url: "https://www.airindia.in/",
  },
  {
    company_name: "IndiGo",
    company_image_url:
      "https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/airlines-companies/indigo-logo.png",
    redirect_url: "https://www.goindigo.in/",
  },
  {
    company_name: "SpiceJet",
    company_image_url:
      "https://logos-world.net/wp-content/uploads/2023/01/SpiceJet-Logo.png",
    redirect_url: "https://www.spicejet.com/",
  },
  {
    company_name: "Vistara",
    company_image_url:
      "https://pbs.twimg.com/media/B3B6A-7CUAAjarl?format=jpg&name=small",
    redirect_url: "https://www.airvistara.com/",
  },
  {
    company_name: "AirAsia India",
    company_image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/2048px-AirAsia_New_Logo.svg.png",
    redirect_url: "https://www.airasia.com/",
  },
  {
    company_name: "GoAir",
    company_image_url:
      "https://icon2.cleanpng.com/20180509/pre/kisspng-goair-rajiv-gandhi-international-airport-airline-l-5af34ca6498395.8569302215258943103011.jpg",
    redirect_url: "https://www.goair.in/",
  },
];

const NewFlight = () => {
  const [formData, setFormData] = useState({
    stops: faker.datatype.number({ min: 1, max: 3 }),
    origin: faker.address.cityName(),
    destination: faker.address.cityName(),
    departure_time: faker.date
      .between(new Date(), new Date(Date.now() + 1000 * 60 * 60 * 24))
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    arrival_time: faker.date
      .between(
        new Date(Date.now() + 1000 * 60 * 60 * 3),
        new Date(Date.now() + 1000 * 60 * 60 * 24)
      )
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    ticket_price: faker.datatype.number({ min: 70, max: 999 }),
  });
  const [selectedAirline, setSelectedAirline] = useState();
  const navigate = useNavigate();

  //   const duration = calculateDuration(
  //     randomFlight?.departure_time,
  //     randomFlight?.arrival_time
  //   );
  //   console.log({ duration });

  const { data, loading } = useFetch("http://localhost:8080/api/flights");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const airlineData = airLines.find(
      (item) => item.company_name === selectedAirline
    );
    const payload = {
      ...formData,
      ...(airlineData || airLines[faker.datatype.number({ min: 1, max: 16 })]),
      stops: +formData.stops,
      ticket_price: +formData.ticket_price,
    };
    console.table(payload);
    console.log([payload]);

    try {
      await axios.post(`http://localhost:8080/api/flights/add`, [payload]);
      navigate("/flights");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Flight</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Choose a Airline</label>
                <select
                  id="hotelId"
                  onChange={(e) => {
                    setSelectedAirline(e.target.value);
                    console.log("Airline: ", e.target.value);
                  }}
                >
                  {loading
                    ? "loading"
                    : airLines &&
                      airLines.map((flight, index) => (
                        <option key={index} value={flight._id}>
                          {flight.company_name}
                        </option>
                      ))}
                </select>
              </div>
              {flightInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFlight;
