import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import style from "./BookCard.module.css";
import { motion } from "framer-motion";

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
      whileHover={{ scale: 1.05 }}
      // onHoverStart={{ scale: 1.2 }}
      className="col-sm-6 col-md-4 col-lg-3 mt-2 p-2 py-0"
    >
      <div
        className="d-flex text-white border border-3 p-2 pb-2 pt-2 flex-column rounded-4"
        style={{ height: "100%", backgroundColor: "#1f2833" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={style.image_container}>
          <center>
            <img src={props.image} width={"80%"} alt="Product" />
          </center>
          {hover && (
            <div
              className={`${style.rating_card} d-flex flex-column align-items-center`}
            >
              <div className="flex-grow-1"></div>
              <div>{stars}</div>
              <div className="bg-dark rounded px-2 text-white">
                <b>{props.genre}</b>
              </div>
              <div className="bg-dark rounded px-2 text-white">
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
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                lineClamp: 2,
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {/* {props.name.length > 30
                ? props.name.slice(0, 30) + "..."
                : props.name} */}
              {props.name}
            </div>
            <div style={{ textAlign: "center" }}>
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
                    backgroundColor: "#c5c6c7",
                    border: "0px",
                  }}
                >
                  {buyHover ? <>Add to Cart &#128722;</> : <>₹ {props.price}</>}
                </button>
                <br></br>
                <button
                  className="btn btn-dark"
                  style={{ width: "100%", color: "#66fcf1", border: "0px" }}
                >
                  Like &#x2764;
                </button>
              </div>
            )}
            {!props.loggedIn && (
              <div>
                <button
                  className="btn btn-primary mb-1"
                  style={{
                    width: "100%",
                    color: buyHover ? "white" : "white",
                    backgroundColor: "#c5c6c7",
                    border: "0px",
                  }}
                >
                  ₹ {props.price}
                </button>
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
