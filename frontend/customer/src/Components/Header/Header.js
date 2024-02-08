import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
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
      </div>
    </nav>
  );
}

export default Header;
