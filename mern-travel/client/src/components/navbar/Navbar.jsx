import "./navbar.css";
import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);
  const location = useLocation();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <div className="navLogo">
            <span className="logo">MERN TRAVEL</span>
          </div>
        </Link>
        {user ? (
          <div className="user-details">
            <span className="navUsername">{user.details.username}</span>
            <div className="navButton">
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="navButton">
            {location.pathname === "/login" && (
              <Link to="/register" style={{ textDecoration: "none" }}>
                <FontAwesomeIcon icon={faCircleUser} />
                <span>Register</span>
              </Link>
            )}
            {location.pathname !== "/login" && (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <FontAwesomeIcon icon={faCircleUser} />
                <span>Login</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
