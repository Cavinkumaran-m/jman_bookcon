import React from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../CustomFunctionalities/Context/UserContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../Utils/Axios";

function Header(props) {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { Store, setStore } = useContext(UserContext);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logoutHandler = () => {
    Axios.get("/logout")
      .then((res) => {
        if (res.data.status === "success") {
          setStore({ isLoggedIn: false, user_id: null, cart_items: null });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get("/checkSession")
      .then((res) => {
        if (res.data.status === "success") {
          setStore({
            isLoggedIn: true,
            user_id: res.data.payload.userId,
            cart_items: null,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
                    <path
                      d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z"
                      fill="#ffffff"
                    />
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
              <NavLink
                to={Store.isLoggedIn ? "order-history" : null}
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
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30px"
                  height="30px"
                  viewBox="0 0 503.379 503.379"
                >
                  <g>
                    <path
                      d="M458.091,128.116v326.842c0,26.698-21.723,48.421-48.422,48.421h-220.92c-26.699,0-48.421-21.723-48.421-48.421V242.439
		c6.907,1.149,13.953,1.894,21.184,1.894c5.128,0,10.161-0.381,15.132-0.969v211.594c0,6.673,5.429,12.104,12.105,12.104h220.92
		c6.674,0,12.105-5.432,12.105-12.104V128.116c0-6.676-5.432-12.105-12.105-12.105H289.835c0-12.625-1.897-24.793-5.297-36.315
		h125.131C436.368,79.695,458.091,101.417,458.091,128.116z M159.49,228.401c-62.973,0-114.202-51.229-114.202-114.199
		C45.289,51.229,96.517,0,159.49,0c62.971,0,114.202,51.229,114.202,114.202C273.692,177.172,222.461,228.401,159.49,228.401z
		 M159.49,204.19c49.618,0,89.989-40.364,89.989-89.988c0-49.627-40.365-89.991-89.989-89.991
		c-49.626,0-89.991,40.364-89.991,89.991C69.499,163.826,109.87,204.19,159.49,204.19z M227.981,126.308
		c6.682,0,12.105-5.423,12.105-12.105s-5.423-12.105-12.105-12.105h-56.386v-47.52c0-6.682-5.423-12.105-12.105-12.105
		s-12.105,5.423-12.105,12.105v59.625c0,6.682,5.423,12.105,12.105,12.105H227.981z M367.697,224.456h-131.14
		c-6.682,0-12.105,5.423-12.105,12.105c0,6.683,5.423,12.105,12.105,12.105h131.14c6.685,0,12.105-5.423,12.105-12.105
		C379.803,229.879,374.382,224.456,367.697,224.456z M367.91,297.885h-131.14c-6.682,0-12.105,5.42-12.105,12.105
		s5.423,12.105,12.105,12.105h131.14c6.685,0,12.104-5.42,12.104-12.105S374.601,297.885,367.91,297.885z M367.91,374.353h-131.14
		c-6.682,0-12.105,5.426-12.105,12.105c0,6.685,5.423,12.104,12.105,12.104h131.14c6.685,0,12.104-5.42,12.104-12.104
		C380.015,379.778,374.601,374.353,367.91,374.353z"
                      fill="white"
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
