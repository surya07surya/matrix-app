import React, { useState } from "react";

const LabelInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="label-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "transparent",
            border: "2px dashed #ccc",
            padding: "12px 10px",
          }}
        >
          This is a label
        </div>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Label"}
        </label>
      </div>
    </div>
  );
};
export default LabelInput