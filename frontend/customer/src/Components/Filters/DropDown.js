import React from "react";

function DropDown({ Reference, id, values, className, styles }) {
  return (
    <div className={className} style={styles}>
      <select
        className="rounded text-black"
        name={id}
        id={id}
        ref={Reference}
        style={{ border:"1px solid #000000",width: "100%", height: "40px", fontWeight:"bold",backgroundColor: "#f8f6f6" ,padding:"5px",paddingRight:"50px"}}
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