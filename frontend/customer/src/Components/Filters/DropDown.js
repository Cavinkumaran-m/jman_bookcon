import React from "react";

function DropDown({ Reference, id, values, className, styles }) {
  return (
    <div className={className} style={styles}>
      <select
        className="rounded"
        name={id}
        id={id}
        ref={Reference}
        style={{ width: "100%", height: "30px", backgroundColor: "#F6B44C" }}
      >
        <option value="Name" hidden>
          Sort by
        </option>
        {values.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
