import React, { useState } from "react";


const DateTimeInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="datetime-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="datetime-local"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Date Time"}
        </label>
      </div>
    </div>
  );
};
export default DateTimeInput