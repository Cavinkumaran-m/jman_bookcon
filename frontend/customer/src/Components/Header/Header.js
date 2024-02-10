import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useContext } from "react";

function Header(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { Store } = useContext(UserContext);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
            <div className="navbar-nav text-white">
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
            <div className="flex-grow-1 d-flex justify-content-end">
              <button className="btn btn-danger btn-sm me-2">Log out</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
