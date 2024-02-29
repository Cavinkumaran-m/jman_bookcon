import React from "react";

function RatingFilter({ starRange, handleStarRange }) {
  return (
    <div
      className="text-white mt-3"
      style={{
        // border: "3px solid #000000",
        borderRadius: "5px",
        backgroundColor: " #F5AC38",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #fff" }}>
        Narrow By Ratings
      </div>
      <center>
        <input
          style={{ marginTop: "1rem", width: "80%", accentColor: "#ffffff" }}
          type="range"
          min="1"
          max="5"
          step={1}
          value={starRange}
          onChange={handleStarRange}
        ></input>
        <br></br>
        <span>{starRange}&#11088;</span>
      </center>
    </div>
  );
}

export default RatingFilter;
