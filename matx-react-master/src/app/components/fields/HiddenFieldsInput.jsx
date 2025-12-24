import React, { useState } from "react";
const HiddenFieldsInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="hiddenfields-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "#fff0f0",
            borderStyle: "dashed",
            borderColor: "#ffaaaa",
            padding: "12px 10px",
            color: "#a1a1a1",
          }}
        >
          (Hidden Field)
        </div>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Hidden Fields"}
        </label>
      </div>
    </div>
  );
};

export default HiddenFieldsInput