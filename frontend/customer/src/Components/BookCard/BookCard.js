import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import style from "./BookCard.module.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function BookCard(props) {
  const [hover, setHover] = useState(false);
  const [buyHover, setBuyHover] = useState(false);
  const stars = new Array(props.rating).fill("⭐");
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: "#a678e7" }}
      // onHoverStart={{ scale: 1.2 }}
      className="col-6 col-sm-6 col-md-3 col-lg-2 mt-2 p-1 py-0 rounded"
    >
      <div
        className="d-flex text-black p-3 pb-3 pt-3 flex-column rounded-4"
        style={{ height: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={style.image_container}>
          <center>
            <img
              src={props.image}
              width={"100%"}
              height={"100%"}
              alt="Product"
            />
          </center>
          {hover && (
            <div
              className={`${style.rating_card} d-flex flex-column align-items-center`}
            >
              <div className="flex-grow-1"></div>
              <div>{stars}</div>
              <div className="rounded px-2 text-white">
                <b>{props.genre}</b>
              </div>
              <div className="rounded px-2 text-white">
                {props.publishYear === 0 ? "NA" : props.publishYear}
              </div>
            </div>
          )}
        </div>

        {props.home && (
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column justify-content-between"
          >
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
                // display: "-webkit-box",
                // lineClamp: 1,
                // WebkitLineClamp: 1,
                // WebkitBoxOrient: "vertical",
              }}
            >
              {/* {props.name.length > 30
                ? props.name.slice(0, 30) + "..."
                : props.name} */}
              {props.name}
            </div>
            <div
              style={{
                textAlign: "center",
                overflow: hover ? "none" : "hidden",
                textOverflow: hover ? "ellipsis" : "none",
                whiteSpace: hover ? "normal" : "nowrap",
              }}
            >
              - <em>{props.author}</em>
            </div>
            <div className="flex-grow-1"></div>
            {props.loggedIn && (
              <div>
                <button
                  className="btn mb-1"
                  onMouseEnter={() => {
                    setBuyHover(true);
                  }}
                  onMouseLeave={() => {
                    setBuyHover(false);
                  }}
                  style={{
                    width: "100%",
                    color: buyHover ? "white" : "white",
                    backgroundColor: "#3881F5",
                    border: "0px",
                  }}
                >
                  {buyHover ? <>Add to Cart</> : <>₹ {props.price}</>}
                  {/* &#128722; */}
                </button>
                <br></br>
                <button
                  className="btn btn-dark"
                  style={{
                    width: "100%",
                    color: "#4d004d",
                    border: "0px",
                    backgroundColor: hover ? "white" : "#c0c0c0",
                  }}
                >
                  Like &#x2764;
                </button>
              </div>
            )}
            {!props.loggedIn && (
              <div>
                <NavLink to={"../login"}>
                  <button
                    onMouseEnter={() => {
                      setBuyHover(true);
                    }}
                    onMouseLeave={() => {
                      setBuyHover(false);
                    }}
                    className="btn btn-primary mb-1"
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundColor: "#3881F5",
                      border: "0px",
                    }}
                  >
                    {buyHover ? "Login" : "₹" + props.price}
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* {!props.home && (
        <div className="mt-3 d-flex flex-column">
          <span className="h5">{props.title}</span>
          <i className="mb-2">{props.author}</i>
          <span className="h5">Starting Price: Rs.{props.price}</span>
          <span className="h5">
            Auction Time: {props.start_time} to {props.end_time}
          </span>
        </div>
      )} */}
      </div>
    </motion.div>
  );
}

export default BookCard;
