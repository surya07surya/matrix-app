import React, { useState } from "react";

const NumberInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="number-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="number"
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Number"}
        </label>
      </div>
    </div>
  );
};

export default NumberInput;
