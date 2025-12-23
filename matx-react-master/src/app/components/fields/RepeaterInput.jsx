import React, { useState } from "react";

const RepeaterInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="repeater-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "#fafafa",
            border: "2px dashed #0B2447",
            padding: "20px",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            flexDirection: "column",
          }}
        >
          <span>Repeater Container</span>
          <span style={{ fontSize: "0.8em", opacity: 0.7 }}>(Drop items here)</span>
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Repeater"}
        </label>
      </div>
    </div>
  );
};
export default RepeaterInput