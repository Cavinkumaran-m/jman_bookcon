import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { Store, setStore } = useContext(UserContext);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logoutHandler = () => {
    setStore({ isLoggedIn: false, user_id: null, cart_items: null });
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="#">
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
              <NavLink className="nav-item nav-link" to="home">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="search">
                Search
              </NavLink>
              <NavLink className="nav-item nav-link" to="cart">
                My Cart
              </NavLink>
              <NavLink className="nav-item nav-link" to="wishlist">
                &#x2764;&#xFE0F;
              </NavLink>
            </div>

            <NavLink
              className="nav-item nav-link text-white me-2"
              onClick={logoutHandler}
              to="login"
            >
              Log Out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
