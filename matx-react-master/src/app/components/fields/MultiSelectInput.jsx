import React, { useState,useEffect } from "react";

const MultiSelectInput = ({ onClick, isSelected, Placeholder, label, options }) => {
  const themeMock = {
    typography: { fontWeightMedium: 600, fontWeightRegular: 400 },
  };

  const defaultOptions = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const items = Array.isArray(options) && options.length ? options : defaultOptions;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const wrapperRef = React.useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  });

  const getStyles = (name, personName, theme) => ({
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  });

  const toggleOption = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelected([]);
  };

  const displayText = selected.length === 0 ? (Placeholder || "Select individuals") : selected.join(", ");

  return (
    <div
      className="multiselect-wrapper"
      ref={wrapperRef}
      style={{
        position: "relative",
        fontFamily: "Inter, Roboto, Arial, sans-serif",
      }}
      onClick={onClick}
    >
      <div className="text-container" style={{ margin: 0, width: "100%" }}>
        <label
          // BACKTICKS ADDED HERE
          className={`text-label ${isSelected ? "label-selected" : ""}`}
          style={{ display: "block", marginBottom: 6, fontSize: 13 }}
        >
          {label || "Name"}
        </label>

        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(true);
          }}
          style={{
            minHeight: 44,
            padding: "8px 12px",
            // BACKTICKS ADDED HERE
            border: `2px solid ${isSelected ? "#3f51b5" : "#0B2447"}`,
            borderRadius: 6,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: isSelected ? "0 0 6px rgba(63,81,181,0.18)" : "none",
            transition: "border-color .18s, box-shadow .18s",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: selected.length ? "#111" : "#777",
            }}
          >
            {displayText}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 4,
                  fontSize: 12,
                  color: "#666",
                }}
                aria-label="Clear selection"
              >
                Clear
              </button>
            )}
            <div
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "150ms",
                fontSize: 12,
              }}
            >
              ▼
            </div>
          </div>
        </div>

        {open && (
          <div
            className="multiselect-dropdown"
            style={{
              position: "absolute",
              top: 56,
              left: 0,
              right: 0,
              zIndex: 200,
              border: "1px solid #ddd",
              borderRadius: 6,
              background: "#fff",
              maxHeight: menuMaxHeight,
              overflowY: "auto",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              padding: 6,
            }}
          >
            {items.map((opt) => (
              <label
                key={opt}
                onMouseDown={(e) => e.preventDefault()} // prevent focus loss before toggling
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggleOption(opt)}
                  style={{ width: 16, height: 16 }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    ...getStyles(opt, selected, themeMock),
                  }}
                >
                  {opt}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MultiSelectInput