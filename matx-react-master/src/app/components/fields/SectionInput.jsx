import React from "react";

const SectionInput = ({
  onClick,
  isSelected,
  childrenData,
  renderChildren,
  label,
  onChildDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div className="section-wrapper" onClick={onClick}>
    <div
  className={`section-container ${isSelected ? "section-selected" : ""}`}
  onDragOver={(e) => {
    e.preventDefault();   // ⭐ REQUIRED FOR DROP
    if (onDragOver) onDragOver(e);
  }}
  onDrop={(e) => {
    e.preventDefault();   // ⭐ REQUIRED
    if (onDrop) onDrop(e);
  }}
>

        {/* ===== SECTION HEADER ===== */}
        <div className="section-header">
          <span className="section-title">
            {label || "Section"}
          </span>

          {/* ✅ DRAG HANDLE (GUARANTEED TO WORK) */}
          <span
            draggable
            title="Drag field"
            style={{
              cursor: "grab",
              padding: "0 8px",
              userSelect: "none"
            }}
            onDragStart={(e) => {
              console.log("drag started from handle");
              e.stopPropagation();
              e.dataTransfer.setData("text/plain", "drag-started");
              // optional: if you want section-level drag later
            }}
          >
            ⠿
          </span>

          <span className="section-info">
            {childrenData?.length || 0} items
          </span>
        </div>

        {/* ===== SECTION BODY ===== */}
        <div className="section-body">
          {childrenData && childrenData.length > 0 ? (
childrenData.map((child) => (
  <div
    key={child.key}
     style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "6px",
    width: "100%"   // ⭐ ADD THIS
  }}
  >
    {/* ✅ FIELD DRAG HANDLE */}
    <span
      draggable
      style={{
        cursor: "grab",
        userSelect: "none",
        paddingTop: "6px"
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData("fieldKey", child.key);
        onChildDragStart(child.key);
        console.log("dragging field:", child.key);
      }}
    >
      ⠿
    </span>

    {/* FIELD UI */}
    <div style={{ flex: 1 }}>
      {renderChildren(child)}
    </div>
  </div>
))
) : (
            <div className="empty-section-placeholder">
              Select this section to add fields here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionInput;



