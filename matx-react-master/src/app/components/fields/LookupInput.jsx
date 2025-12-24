import React, { useState } from "react";
const LookupInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="lookup-wrapper" onClick={onClick}>
      <div className="text-container">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            className={`text-field ${isSelected ? "field-selected" : ""}`}
            placeholder={Placeholder || " "}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ borderRight: "none", borderRadius: "6px 0 0 6px" }}
          />
          <button
            type="button"
            style={{
              border: "2px solid #0B2447",
              padding: "0 15px",
              borderRadius: "0 6px 6px 0",
              background: "#f0f0f0",
            }}
          >
            Search
          </button>
        </div>
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Lookup"}
        </label>
      </div>
    </div>
  );
};

export default LookupInput