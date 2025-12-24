import React, { useState } from "react";
const TextInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="text-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="text"
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || "Enter Text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Text"}
        </label>
      </div>
    </div>
  );
};

export default TextInput;




