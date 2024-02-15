import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./BookCard.module.css";

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
    <div className="col-sm-6 col-md-4 mt-4 p-1">
      <div
        className="d-flex bg-white border p-1 flex-column rounded"
        style={{ height: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={style.image_container}>
          <img src={props.image} width={"100%"} alt="Product" />
          {hover && (
            <div
              className={`${style.rating_card} d-flex flex-column align-items-center`}
            >
              <div className="flex-grow-1"></div>
              <div>{stars}</div>
              <div className="bg-dark rounded px-2 text-white">
                <b>{props.genre}</b>
              </div>
            </div>
          )}
        </div>

        {props.home && (
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column justify-content-between"
          >
            <div style={{ textAlign: "center" }}>{props.name}</div>
            <div style={{ textAlign: "center" }}>
              - <em>{props.author}</em>
            </div>
            <div className="flex-grow-1"></div>
            <div>
              <button
                className="btn btn-primary mb-1"
                onMouseEnter={() => {
                  setBuyHover(true);
                }}
                onMouseLeave={() => {
                  setBuyHover(false);
                }}
                style={{ width: "100%" }}
              >
                {buyHover ? <>Add to Cart &#128722;</> : <>₹ {props.price}</>}
              </button>
              <br></br>
              <button className="btn btn-dark" style={{ width: "100%" }}>
                Like &#x2764;
              </button>
            </div>
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
    </div>
  );
}

export default BookCard;
