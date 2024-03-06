import React from "react";

function DropDown({ Reference, id, values, className, styles }) {
  return (
    <div className={className} style={styles}>
      <select
        className="rounded text-primary"
        name={id}
        id={id}
        ref={Reference}
        style={{ width: "100%", height: "40px", fontWeight:"bold",backgroundColor: "#ebebeb" ,padding:"5px",paddingRight:"5px"}}
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
