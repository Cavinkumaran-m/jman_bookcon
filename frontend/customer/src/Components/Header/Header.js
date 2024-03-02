import React from "react";
import { toast } from "react-toastify";
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
      className="navbar navbar-expand-sm px-4"
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "1",
        backgroundColor: "#3881F5",
      }}
    >
      <NavLink
        className="navbar-brand fw-bold"
        to="home"
        style={{ color: "#fff" }}
      >
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
        {["/login", "/register", "/forgot-password"].indexOf(
          location.pathname
        ) === -1 && (
          <>
            <div className="navbar-nav text-white flex-grow-1">
              <NavLink
                to="home"
                className="nav-item nav-link py-0 ps-3 align-items-center d-flex"
              >
                {/* Home */}
                {/* &#127968; */}
                <svg
                  style={{ cursor: "pointer" }}
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M22 22L2 22"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 22V9.5"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 9.5V13.5M20 22V17.5"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </NavLink>
              <NavLink
                to={Store.isLoggedIn ? "wishlist" : null}
                className="nav-item nav-link py-0 px-3 d-flex align-items-center"
              >
                {/* WishList */}
                {/* &#x2764; */}
                <svg
                  onClick={() => {
                    if (Store.isLoggedIn) {
                      return;
                    }
                    toast.info("Please Login to access WishList Page", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                  fill="#ffffff"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path d="M19 22V4c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v18l7-4.666L19 22zM8.006 8.056c0-.568.224-1.083.585-1.456.361-.372.86-.603 1.412-.603 0 0 .996-.003 1.997 1.029 1.001-1.032 1.997-1.029 1.997-1.029.552 0 1.051.23 1.412.603s.585.888.585 1.456-.224 1.084-.585 1.456L12 13.203 8.591 9.512a2.083 2.083 0 0 1-.585-1.456z" />
                  </g>
                </svg>
              </NavLink>
              <NavLink
                to={Store.isLoggedIn ? "cart" : null}
                className="nav-item nav-link py-0 px-s d-flex align-items-center"
              >
                {/* My Cart */}
                {/* &#128722; */}
                <svg
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (Store.isLoggedIn) {
                      return;
                    }
                    toast.info("Please Login to access Cart Page", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }}
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </NavLink>
            </div>
            {!Store.isLoggedIn && (
              <>
                <NavLink
                  className="nav-item nav-link fw-bold me-3"
                  to="register"
                  style={{ color: "#fff" }}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  className="nav-item nav-link fw-bold"
                  to="login"
                  style={{ color: "#fff" }}
                >
                  Log In
                </NavLink>
              </>
            )}
            {Store.isLoggedIn && (
              <NavLink
                className="nav-item nav-link fw-bold"
                onClick={logoutHandler}
                to="home"
                style={{ color: "#fff" }}
              >
                Log Out
              </NavLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
