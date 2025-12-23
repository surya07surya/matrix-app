import React, { useState } from "react";


const CheckboxInput = ({ onClick, isSelected, label }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const gadgets = ["Smartphone", "Laptop", "Smartwatch", "Headphones"];

  return (
    <div className="checkbox-wrapper" onClick={onClick}>
      <div
        className="text-container"
        style={{
          // BACKTICKS ADDED HERE
          border: `2px solid ${isSelected ? "#3f51b5" : "#0B2447"}`,
          padding: "20px 10px 10px 10px",
          borderRadius: "6px",
        }}
      >
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend
            style={{ padding: "0 6px" }}
            // BACKTICKS ADDED HERE
            className={`text-label ${isSelected ? "label-selected" : ""}`}
          >
            {label || "Gadgets Options"}
          </legend>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {gadgets.map((gadget) => (
              <label
                key={gadget}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  name={gadget}
                  checked={!!checkedItems[gadget]}
                  onChange={handleChange}
                  style={{ width: "16px", height: "16px" }}
                />
                {gadget}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};
export default CheckboxInput;