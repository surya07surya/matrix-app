import React, { useState } from "react";
const FileUploadInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="fileupload-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="file"
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{ paddingTop: "10px" }}
        />
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "File Upload"}
        </label>
      </div>
    </div>
  );
};


export default FileUploadInput