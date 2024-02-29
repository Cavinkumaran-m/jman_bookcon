import React from "react";

function PriceFilter({ priceRange, handlePriceRange }) {
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
