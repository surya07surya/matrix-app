import React, { useState } from "react";
const DropdownInput = ({ onClick, isSelected, label, Placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <div className="dropdown-wrapper" onClick={onClick}>
      <div className="text-container">
        <select
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">
            {Placeholder || "Select an option"}
          </option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
        </select>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Dropdown"}
        </label>
      </div>
    </div>
  );
};

export default DropdownInput;
