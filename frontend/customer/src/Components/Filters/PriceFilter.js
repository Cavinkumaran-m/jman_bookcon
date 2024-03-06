import React from "react";

function PriceFilter({ priceRange, handlePriceRange }) {
  return (
    <div
      className="text-primary mt-4"
      style={{
        // border: "3px solid #000000",
        borderRadius: "5px",
        backgroundColor: " #ebebeb",
      }}
    >
      <div className="ps-2" style={{ fontWeight :"bold",borderBottom: "5px solid #ffffff" }}>
        Narrow By Price
      </div>
      <center>
        <input
          style={{
            marginTop: "1rem",
            width: "90%",
            fontWeight :"bold",
            accentColor: "#3881f5",
          }}
          type="range"
          min="100"
          max="5000"
          step={100}
          value={priceRange}
          onChange={handlePriceRange}
        ></input>
        <br></br>
        <span><b>Under ₹{priceRange}</b></span>
      </center>
    </div>
  );
}

export default PriceFilter;
