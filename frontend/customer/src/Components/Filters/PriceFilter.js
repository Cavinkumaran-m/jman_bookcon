import React from "react";

function PriceFilter({ priceRange, handlePriceRange }) {
  return (
    <div className="text-white border border-secondary border-3">
      <div className="border border-secondary border-2 ps-2">
        Narrow By Price
      </div>
      <br></br>
      <center>
        <input
          style={{
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
