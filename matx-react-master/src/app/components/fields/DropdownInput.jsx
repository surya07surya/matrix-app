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
          <option value="">{Placeholder || "Select a favourite city..."}</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
        </select>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Select cars"}
        </label>
      </div>
    </div>
  );
};

export default DropdownInput;
