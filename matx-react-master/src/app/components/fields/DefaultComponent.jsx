import React, { useState } from "react";
const DefaultComponent = ({ type, onClick, isSelected }) => (
  <div
    style={{
      margin: "40px 20px",
      padding: "20px",
      border: `2px dashed ${isSelected ? "#0B2447" : "#ccc"}`,
      width: "320px",
      backgroundColor: isSelected ? "#eef" : "#fafafa",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <p>
      This is a placeholder for the <strong>{type}</strong> component.
    </p>
    <p style={{ fontSize: "0.8rem", color: "#666" }}>
      Click to see properties.
    </p>
  </div>
);

export default DefaultComponent