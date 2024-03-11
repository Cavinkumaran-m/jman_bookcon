import React from "react";

function RatingFilter({ starRange, handleStarRange }) {
  return (
    <div
      className="text-black mt-4"
      style={{
        border: "1px solid #000000",
        borderRadius: "5px",
        backgroundColor: " #f8f6f6",
      }}
    >
      <div className="ps-2" style={{ fontWeight :"bold",borderBottom: "5px solid #ffffff" }}>
        Narrow By Ratings
      </div>
      <center>
        <input
          style={{ marginTop: "1rem", width: "80%", accentColor: "#3881f5" }}
          type="range"
          min="1"
          max="5"
          step={1}
          value={starRange}
          onChange={handleStarRange}
        ></input>
        <br></br>
        <span><b>{starRange}&#11088;</b></span>
      </center>
    </div>
  );
}

export default RatingFilter;
