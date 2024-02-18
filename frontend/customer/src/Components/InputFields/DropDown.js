import React from "react";

function DropDown({ Reference, id, values, className, styles }) {
  return (
    <div className={className} style={styles}>
      <select className="rounded" name={id} id={id} ref={Reference}>
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