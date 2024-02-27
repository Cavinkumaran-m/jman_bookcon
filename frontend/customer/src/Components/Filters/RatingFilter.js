import React from "react";

function RatingFilter({ starRange, handleStarRange }) {
  return (
    <div
      className="text-white mt-3"
      style={{
        border: "3px solid #c5c6c7",
        borderRadius: "5px",
        backgroundColor: " #22252c",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #c5c6c7" }}>
        Narrow By Ratings
      </div>
      <center>
        <input
          style={{ marginTop: "1rem", width: "80%", accentColor: "#c5c6c7" }}
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
