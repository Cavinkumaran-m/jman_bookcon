import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  return (
    <div className="container d-flex bg-white border p-4 mt-4 flex-column rounded">
      <div className="row">
        <img
          className="col-sm-4 col-12"
          src={props.image}
          height={"100%"}
          width={"100%"}
          alt="Product"
          style={{ objectFit: "contain" }}
        />
        {props.home && (
          <div className="mt-3 mt-sm-0 col-sm-8 col-12 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between">
                <span className="h5">{props.name}</span>
                <i className="">By {props.author}</i>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <span className="h8">
                    Genre: {props.genre} &emsp;{props.rating}⭐
                  </span>
                </div>
                <span className="h5">Rs.{props.price}</span>
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary mb-1"
                style={{ width: "100%" }}
              >
                Add to Cart &#128722;
              </button>
              <br></br>
              <button className="btn btn-dark" style={{ width: "100%" }}>
                Like &#x2764;
              </button>
            </div>
          </div>
        )}
      </div>

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
  );
}

export default BookCard;
