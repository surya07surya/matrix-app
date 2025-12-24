import React, { useState } from "react";
const DateInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="date-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="date"
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Date"}
        </label>
      </div>
    </div>
  );
};

export default DateInput