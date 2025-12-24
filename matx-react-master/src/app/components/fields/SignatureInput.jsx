import React, { useState } from "react";

const SignatureInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="signature-wrapper" onClick={onClick}>
      <div className="text-container">
        <canvas
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{ height: "150px", background: "#f4f4f4", cursor: "crosshair", width: "100%" }}
        >
        </canvas>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Signature"}
        </label>
      </div>
    </div>
  );
};
export default SignatureInput