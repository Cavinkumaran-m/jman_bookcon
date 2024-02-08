import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    setImageSrc(`data:image/jpeg;base64,${props.image}`);
  }, [props.image]);

  return (
    <div className="container d-flex bg-white p-4 mt-4 flex-column rounded">
      <div>
        <img
          src={imageSrc}
          height={"100%"}
          width={"100%"}
          alt="Product"
          style={{ objectFit: "contain" }}
        />
      </div>
      {props.home && (
        <div className="mt-3 d-flex flex-column">
          <span className="h5">{props.title}</span>
          <i className="mb-2">{props.desc}</i>
          <span className="h5">Rs.{props.price}</span>
          <Link to={`/bids/${props.id}`} className="btn btn-primary">
            Set your Bid
          </Link>
        </div>
      )}

      {!props.home && (
        <div className="mt-3 d-flex flex-column">
          <span className="h5">{props.title}</span>
          <i className="mb-2">{props.desc}</i>
          <span className="h5">Starting Price: Rs.{props.price}</span>
          <span className="h5">
            Auction Time: {props.start_time} to {props.end_time}
          </span>
        </div>
      )}
    </div>
  );
}

export default BookCard;
