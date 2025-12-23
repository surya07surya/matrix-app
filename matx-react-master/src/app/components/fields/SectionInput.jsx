import React from "react";

const SectionInput = ({
  onClick,
  isSelected,
  childrenData,
  renderChildren,
  label,
  onDrop,
  onDragOver,
}) => {
  return (
    <div
      className="section-wrapper"
      onClick={onClick}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver && onDragOver(e);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop && onDrop(e);
      }}
    >
      <div className={`section-container ${isSelected ? "section-selected" : ""}`}>
        <div className="section-header">
          <span className="section-title">{label || "Section"}</span>
          <span className="section-info">
            {childrenData?.length || 0} items
          </span>
        </div>

        <div className="section-body">
          {childrenData && childrenData.length > 0 ? (
            childrenData.map((child) => renderChildren(child))
          ) : (
            <div className="empty-section-placeholder">
              Drop fields here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionInput;

