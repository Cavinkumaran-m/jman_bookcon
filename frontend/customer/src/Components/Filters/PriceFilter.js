import React from "react";

function PriceFilter({ priceRange, handlePriceRange }) {
  return (
    <div
      className="text-white"
      style={{
        border: "3px solid #c5c6c7",
        borderRadius: "5px",
        backgroundColor: " #1f2833",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #c5c6c7" }}>
        Narrow By Price
      </div>
      <center>
        <input
          style={{
            marginTop: "1rem",
            width: "80%",
            accentColor: "#c5c6c7",
          }}
          type="range"
          min="100"
          max="5000"
          step={100}
          value={priceRange}
          onChange={handlePriceRange}
        ></input>
        <br></br>
        <span>Under ₹{priceRange}</span>
      </center>
    </div>
  );
}

export default PriceFilter;
