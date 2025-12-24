import React, { useState } from "react";
const TextAreaInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="textarea-wrapper" onClick={onClick}>
      <div className="text-container">
        <textarea
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || "Enter Text"}
          value={value}
          id=""
          onChange={(e) => setValue(e.target.value)}
        />
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Text Area"}
        </label>
      </div>
    </div>
  );
};


export default TextAreaInput;
