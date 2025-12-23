import React, { useState } from "react";

const TextInput = ({
  onClick,
  isSelected,
  Placeholder,
  label
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="text-wrapper" onClick={onClick}>
      <div
        className="drag-handle"
        draggable={true}
        onMouseDown={(e) => {
          e.stopPropagation();
          console.log("MOUSE DOWN");
        }}
        onDragStart={(e) => {
          console.log("🔥 DRAG START");
          e.stopPropagation();
          e.dataTransfer.setData("text/plain", "drag");
        }}
        style={{
          cursor: "grab",
          padding: "6px",
          marginBottom: "6px",
          background: "#e5e7eb",
          borderRadius: "4px",
          width: "fit-content",
          userSelect: "none"
        }}
      >
        ☰ DRAG
      </div>

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




