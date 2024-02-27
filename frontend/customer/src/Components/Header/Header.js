import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { Store, setStore } = useContext(UserContext);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logoutHandler = () => {
    setStore({ isLoggedIn: false, user_id: null, cart_items: null });
  };
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark px-4"
      style={{ position: "sticky", top: "0px", zIndex: "1" }}
    >
      <NavLink className="navbar-brand" to="home" style={{ color: "#e14658" }}>
        BookCon
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNavAltMarkup"
      >
        {Store.isLoggedIn && (
          <>
            <div className="navbar-nav text-white flex-grow-1">
              <NavLink
                className="nav-item nav-link"
                to="home"
                style={{ color: "#fff" }}
              >
                Home
                {/* &#127968; */}
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="wishlist"
                style={{ color: "#fff" }}
              >
                WishList
                {/* &#x2764; */}
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="cart"
                style={{ color: "#fff" }}
              >
                My Cart
                {/* &#128722; */}
              </NavLink>
            </div>

            <NavLink
              className="nav-item nav-link"
              onClick={logoutHandler}
              to="home"
              style={{ color: "#c5c6c7" }}
            >
              Log Out
            </NavLink>
          </>
        )}
        {!Store.isLoggedIn && location.pathname !== "/login" && (
          <>
            <div className="flex-grow-1"></div>
            <NavLink className="nav-item nav-link text-white" to="login">
              Log In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
