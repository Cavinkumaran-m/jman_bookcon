import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import style from "../../Assets/Filter.css";

function PriceFilter({ minPrice, maxPrice, handlePriceRange }) {
  return (
    <div
      className="text-black mt-4"
      style={{
        border: "1px solid #000000",
        borderRadius: "5px",
        backgroundColor: " #f8f6f6",
      }}
    >
      <div
        className="ps-2"
        style={{ fontWeight: "bold", borderBottom: "5px solid #ffffff" }}
      >
        Narrow By Price
      </div>
      <center>
        <MultiRangeSlider
          min={0}
          max={5000}
          step={100}
          stepOnly={true}
          ruler={false}
          label={false}
          labels={false}
          style={{}}
          minValue={minPrice}
          maxValue={maxPrice}
          barInnerColor="#3881F5"
          onInput={(e) => {
            handlePriceRange(e);
          }}
        />
        {/* <input
          style={{
            marginTop: "1rem",
            width: "90%",
            fontWeight: "bold",
            accentColor: "#3881f5",
          }}
          type="range"
          min="100"
          max="5000"
          step={100}
          value={priceRange}
          onChange={handlePriceRange}
        ></input> */}
        <span>
          <b>
            ₹{minPrice} - ₹{maxPrice}
          </b>
        </span>
      </center>
    </div>
  );
}

export default PriceFilter;
