
import React, { useState } from "react";

const TableInput = ({ onClick, isSelected, label, Placeholder }) => {
  const [colCount, setColCount] = useState(4);
  const [rows, setRows] = useState([Array(4).fill("")]); 

  const addColumn = (e) => {
    e.stopPropagation();
    setColCount((prev) => prev + 1);
    setRows((prevRows) => prevRows.map((row) => [...row, ""]));
  };

  const removeColumn = (e) => {
    e.stopPropagation();
    if (colCount > 1) {
      setColCount((prev) => prev - 1);
      setRows((prevRows) => prevRows.map((row) => row.slice(0, -1)));
    }
  };

  const addRow = (e) => {
    e.stopPropagation(); 
    setRows([...rows, Array(colCount).fill("")]);
  };

  const updateCell = (rowIndex, colIndex, val) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = val;
    setRows(newRows);
  };

  const headerCellStyle = {
    background: "#0F172A",
    color: "white",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    borderRight: "1px solid #1e293b"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    outline: "none",
    fontSize: "14px",
    color: "#334155",
    background: "white"
  };

  return (
    <div className="table-wrapper" onClick={onClick}>
      <div className="text-container" style={{ margin: '10px 0' }}>
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            padding: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "auto",
            minHeight: "150px",
            background: "#fff",
            // BACKTICKS ADDED HERE
            border: isSelected ? "2px solid #3f51b5" : "1px solid #e2e8f0"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", fontSize: "12px" }}>
             <label style={{ color: "#64748b", fontWeight: 600 }}>Columns:</label>
             <button 
               type="button"
               onClick={removeColumn}
               style={{
                 padding: "2px 8px",
                 border: "1px solid #cbd5e1",
                 background: "#f1f5f9",
                 borderRadius: "4px",
                 cursor: colCount > 1 ? "pointer" : "not-allowed",
                 opacity: colCount > 1 ? 1 : 0.5
               }}
             >
               -
             </button>
             <span style={{ fontWeight: "bold", color: "#334155" }}>{colCount}</span>
             <button 
               type="button"
               onClick={addColumn}
               style={{
                 padding: "2px 8px",
                 border: "1px solid #cbd5e1",
                 background: "#f1f5f9",
                 borderRadius: "4px",
                 cursor: "pointer"
               }}
             >
               +
             </button>
          </div>

          <div style={{ overflowX: "auto", width: "100%", borderRadius: "6px 6px 0 0" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px", fontSize: "14px", minWidth: "100%" }}>
            <thead>
              <tr>
                {Array.from({ length: colCount }).map((_, i) => (
                    <th key={i} style={{ 
                        ...headerCellStyle, 
                        borderRadius: i === 0 ? "6px 0 0 6px" : i === colCount - 1 ? "0 6px 6px 0" : "0" 
                    }}>
                        Column-{i + 1}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "0 5px" }}>
                        <input 
                        type="text" 
                        value={cell} 
                        onChange={(e) => updateCell(i, j, e.target.value)}
                        style={inputStyle}
                        placeholder={j === 0 ? (Placeholder || "Enter value...") : ""}
                        />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <button 
            type="button"
            onClick={addRow}
            style={{
              marginTop: "10px",
              alignSelf: "flex-start",
              background: "transparent",
              color: "#10b981",
              border: "1px solid #10b981",
              borderRadius: "4px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: "1" }}>+</span> Line Item
          </button>
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Table Input"}
        </label>
      </div>
    </div>
  );
};
export default TableInput