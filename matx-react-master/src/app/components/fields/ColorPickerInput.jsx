import React, { useState } from "react";


const ColorPickerInput = ({ onClick, isSelected, label }) => {
  const [value, setValue] = useState("#0B2447");

  return (
    <div className="colorpicker-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="color"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ height: "50px", padding: "5px" }}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Color Picker"}
        </label>
      </div>
    </div>
  );
};
export default ColorPickerInput