
import React, { useState } from "react";

const ComputedFieldsInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="computedfields-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "#eee",
            borderStyle: "dotted",
            padding: "12px 10px",
          }}
        >
          Computed Value: [Result]
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Computed Fields"}
        </label>
      </div>
    </div>
  );
};
export default ComputedFieldsInput