import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Register from "./pages/Register/Register";
import FlightHome from "./flight/FlightHome/FlightHome";
import FlightList from "./flight/FlightList/FlightList";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* flight routes */}
          <Route path="/flight-booking">
            <Route path="" element={<FlightHome />} />
            <Route path="flights" element={<FlightList />} />
          </Route>

          {/* hotel routes */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
