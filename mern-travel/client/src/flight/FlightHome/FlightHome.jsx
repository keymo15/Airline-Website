import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import FeaturedFlights from "../FeaturedFlights/FeaturedFlights";
import FlightHeader from "../FlightHeader/FlightHeader";
import "./FlightHome.css";
import useLocation from "../../hooks/useLocation";
import AllFlights from "../AllFlights/AllFlights";

const FlightHome = () => {
  // const city = "Ahmedabad";
  const city = useLocation();
  return (
    <div>
      <Navbar />
      <FlightHeader city={city}/>
      <div className="homeContainer">
        <h1 className="homeTitle">Trips From {city}</h1>
        <FeaturedFlights city={city} />
        <AllFlights />
        <Footer />
      </div>
    </div>
  );
};

export default FlightHome;
