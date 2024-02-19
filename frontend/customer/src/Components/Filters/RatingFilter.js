import React from "react";

function RatingFilter({ starRange, handleStarRange }) {
  return (
    <div className="text-white border border-secondary mt-3 border-3">
      <div className="border border-secondary border-2 ps-2">
        Narrow By Ratings
      </div>
      <br></br>
      <center>
        <input
          style={{ width: "80%", accentColor: "#c5c6c7" }}
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
