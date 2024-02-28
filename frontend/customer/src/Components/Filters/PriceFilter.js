import React from "react";

function PriceFilter({ priceRange, handlePriceRange }) {
  return (
    <div
      className="text-white"
      style={{
        border: "3px solid #000000",
        borderRadius: "5px",
        backgroundColor: " #4d004d",
      }}
    >
      <div className="ps-2" style={{ borderBottom: "3px solid #ffffff" }}>
        Narrow By Price
      </div>
      <center>
        <input
          style={{
            marginTop: "1rem",
            width: "80%",
            accentColor: "#ffffff",
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
