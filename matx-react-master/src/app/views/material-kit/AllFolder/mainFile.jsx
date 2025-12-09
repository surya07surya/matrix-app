import React, { useState, useEffect, useRef } from "react";

// --- SECTION 1: MOCK DATA (from your formTypes.json) ---
const formConfig = {
  FormTypes: {
    Section: {
      id: "0",
      Placeholder: "",
      Default_Value: "Section",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "New Section",
      children: [], 
    },
    Text: {
      id: "0",
      Placeholder: "Enter Value",
      Default_Value: "Text",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Text Field",
    },
    TextArea: {
      id: "0",
      Placeholder: "Enter Value",
      Default_Value: "TextArea",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Text Area",
    },
    Number: {
      id: "0",
      Placeholder: "Enter Value",
      Default_Value: "Number",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Number",
    },
    Dropdown: {
      id: "0",
      Placeholder: "Select Option",
      Default_Value: "Dropdown",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Dropdown",
    },
    MultiSelect: {
      id: "0",
      Placeholder: "Select individuals",
      Default_Value: "MultiSelect",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Multi Select",
    },
    Radio: {
      id: "0",
      Placeholder: "Select Option",
      Default_Value: "Radio",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Radio",
    },
    Checkbox: {
      id: "0",
      Placeholder: "Check options",
      Default_Value: "Checkbox",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Checkbox",
    },
    Date: {
      id: "0",
      Placeholder: "Select Date",
      Default_Value: "Date",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Date",
    },
    DateTime: {
      id: "0",
      Placeholder: "Select Date Time",
      Default_Value: "DateTime",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Date Time",
    },
    FileUpload: {
      id: "0",
      Placeholder: "Upload File",
      Default_Value: "FileUpload",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "File Upload",
    },
    Lookup: {
      id: "0",
      Placeholder: "Search...",
      Default_Value: "Lookup",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Lookup",
    },
    Table: {
      id: "0",
      Placeholder: "Enter Data",
      Default_Value: "Table",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Table",
    },
    Repeater: {
      id: "0",
      Placeholder: "",
      Default_Value: "Repeater",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Repeater",
    },
    ColorPicker: {
      id: "0",
      Placeholder: "Pick Color",
      Default_Value: "ColorPicker",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Color Picker",
    },
    Label: {
      id: "0",
      Placeholder: "Label Text",
      Default_Value: "Label",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Label",
    },
    Signature: {
      id: "0",
      Placeholder: "Sign Here",
      Default_Value: "Signature",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Signature",
    },
    ComputedFields: {
      id: "0",
      Placeholder: "Computed Result",
      Default_Value: "ComputedFields",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Computed",
    },
    HiddenFields: {
      id: "0",
      Placeholder: "Hidden Value",
      Default_Value: "HiddenFields",
      Required: "false",
      Readonly: "false",
      Visible: "true",
      label: "Hidden",
    },
  },
};
// --- END MOCK DATA ---

// --- SECTION 2: ALL FIELD COMPONENTS ---

const SectionInput = ({ onClick, isSelected, childrenData, renderChildren, label }) => {
  return (
    <div className="section-wrapper" onClick={onClick}>
      <div
        className={`section-container ${
          isSelected ? "section-selected" : ""
        }`}
      >
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
              Select this section to add fields here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

const TextInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="text-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="text"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || "Enter Text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Text"}
        </label>
      </div>
    </div>
  );
};

const TextAreaInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="textarea-wrapper" onClick={onClick}>
      <div className="text-container">
        <textarea
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || "Enter Text"}
          value={value}
          id=""
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Text Area"}
        </label>
      </div>
    </div>
  );
};

const NumberInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="number-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="number"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Number"}
        </label>
      </div>
    </div>
  );
};

const DropdownInput = ({ onClick, isSelected, label, Placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <div className="dropdown-wrapper" onClick={onClick}>
      <div className="text-container">
        <select
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">{Placeholder || "Select a favourite city..."}</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
        </select>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Select cars"}
        </label>
      </div>
    </div>
  );
};

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


const RadioInput = ({ onClick, isSelected, label, Placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <div className="radio-wrapper" onClick={onClick}>
      <div className="text-container">
        <select
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">{Placeholder || "Select a favourite city..."}</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
        </select>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Favourite Cities"}
        </label>
      </div>
    </div>
  );
};

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

const DateInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="date-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="date"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Date"}
        </label>
      </div>
    </div>
  );
};

const DateTimeInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="datetime-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="datetime-local"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          placeholder={Placeholder || " "}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Date Time"}
        </label>
      </div>
    </div>
  );
};

const FileUploadInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="fileupload-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="file"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{ paddingTop: "10px" }}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "File Upload"}
        </label>
      </div>
    </div>
  );
};

const LookupInput = ({ onClick, isSelected, Placeholder, label }) => {
  const [value, setValue] = useState("");

  return (
    <div className="lookup-wrapper" onClick={onClick}>
      <div className="text-container">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            // BACKTICKS ADDED HERE
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
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Lookup"}
        </label>
      </div>
    </div>
  );
};

const ColorPickerInput = ({ onClick, isSelected, label }) => {
  const [value, setValue] = useState("#0B2447");

  return (
    <div className="colorpicker-wrapper" onClick={onClick}>
      <div className="text-container">
        <input
          type="color"
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ height: "50px", padding: "5px" }}
        />
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Color Picker"}
        </label>
      </div>
    </div>
  );
};

const LabelInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="label-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "transparent",
            border: "2px dashed #ccc",
            padding: "12px 10px",
          }}
        >
          This is a label
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Label"}
        </label>
      </div>
    </div>
  );
};

const SignatureInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="signature-wrapper" onClick={onClick}>
      <div className="text-container">
        <canvas
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{ height: "150px", background: "#f4f4f4", cursor: "crosshair", width: "100%" }}
        >
        </canvas>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Signature"}
        </label>
      </div>
    </div>
  );
};

const ComputedFieldsInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="computedfields-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "#eee",
            borderStyle: "dotted",
            padding: "12px 10px",
          }}
        >
          Computed Value: [Result]
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Computed Fields"}
        </label>
      </div>
    </div>
  );
};

const HiddenFieldsInput = ({ onClick, isSelected, label }) => {
  return (
    <div className="hiddenfields-wrapper" onClick={onClick}>
      <div className="text-container">
        <div
          // BACKTICKS ADDED HERE
          className={`text-field ${isSelected ? "field-selected" : ""}`}
          style={{
            background: "#fff0f0",
            borderStyle: "dashed",
            borderColor: "#ffaaaa",
            padding: "12px 10px",
            color: "#a1a1a1",
          }}
        >
          (Hidden Field)
        </div>
        {/* BACKTICKS ADDED HERE */}
        <label className={`text-label ${isSelected ? "label-selected" : ""}`}>
          {label || "Hidden Fields"}
        </label>
      </div>
    </div>
  );
};

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

const DefaultComponent = ({ type, onClick, isSelected }) => (
  <div
    style={{
      margin: "40px 20px",
      padding: "20px",
      // BACKTICKS ADDED HERE
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

// --- SECTION 4: MAIN APP COMPONENT ---

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 64;

export default function App() {
  const [selectedForm, setSelectedForm] = useState([]);
  const [isFormTypesPanelOpen, setIsFormTypesPanelOpen] = useState(true); 
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false); 
  const [selectedFieldKey, setSelectedFieldKey] = useState(null); 

  const formTypes = Object.keys(formConfig.FormTypes).filter(type => type !== "Section");

  const initialCounters = Object.keys(formConfig.FormTypes).reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  const [fieldCounters, setFieldCounters] = useState(initialCounters);

  // Recursive helper to insert fields (unchanged)
  const insertFieldIntoTree = (items, targetKey, newField) => {
    return items.map(item => {
      if (item.key === targetKey && item.type === "Section") {
        return {
          ...item,
          children: [...(item.children || []), newField]
        };
      }
      if (item.children && item.children.some(child => child.key === targetKey)) {
          return {
            ...item,
            children: [...item.children, newField]
          };
      }
      if (item.children) {
        return {
          ...item,
          children: insertFieldIntoTree(item.children, targetKey, newField)
        };
      }
      return item;
    });
  };

  // --- UPDATED: Handles recursive property updates AND type switching
  const updateFieldInTree = (items, targetKey, newProps) => {
      return items.map(item => {
        if (item.key === targetKey) {
            return { ...item, ...newProps };
        }
        if (item.children) {
            return { ...item, children: updateFieldInTree(item.children, targetKey, newProps) };
        }
        return item;
      });
  };

  // --- NEW: Recursive helper to DELETE a field
  const deleteFieldFromTree = (items, targetKey) => {
    const filteredItems = items.filter(item => item.key !== targetKey);
    if (filteredItems.length === items.length) {
        return items.map(item => {
            if (item.children) {
                return { ...item, children: deleteFieldFromTree(item.children, targetKey) };
            }
            return item;
        });
    }
    return filteredItems;
  };

  const findKeyInTree = (items, targetKey) => {
    for (const item of items) {
      if (item.key === targetKey) return true;
      if (item.children && findKeyInTree(item.children, targetKey)) return true;
    }
    return false;
  };

  const handleAddSection = () => {
    const nextId = fieldCounters["Section"] + 1;
    // BACKTICKS ADDED HERE
    const newKey = `Section-${nextId}`;
    // Copy default props from config
    const defaultProps = formConfig.FormTypes["Section"];
    
    const newItem = {
      ...defaultProps,
      type: "Section",
      key: newKey,
      id: nextId,
      children: []
    };
    setFieldCounters((prevCounters) => ({
      ...prevCounters,
      Section: nextId,
    }));
    setSelectedForm(prev => [...prev, newItem]);
    setSelectedFieldKey(newKey);
    setIsPropertiesPanelOpen(false);
  };

  const handleAddField = (formType) => {
    const nextId = fieldCounters[formType] + 1;
    // BACKTICKS ADDED HERE
    const newKey = `${formType}-${nextId}`;
    
    // Copy default props from config
    const defaultProps = formConfig.FormTypes[formType];

    const newItem = {
      ...defaultProps,
      type: formType,
      key: newKey,
      id: nextId,
      ...(formType === "Section" ? { children: [] } : {})
    };

    setFieldCounters((prevCounters) => ({
      ...prevCounters,
      [formType]: nextId,
    }));
    if (selectedFieldKey && findKeyInTree(selectedForm, selectedFieldKey)) {
        setSelectedForm(prev => insertFieldIntoTree(prev, selectedFieldKey, newItem));
    } else {
        setSelectedForm(prev => [...prev, newItem]);
    }
    setSelectedFieldKey(newKey);
    setIsPropertiesPanelOpen(true);
  };

  const handleFieldClick = (e, form) => {
    e.stopPropagation(); 
    setSelectedFieldKey(form.key);
    // Keep panel logic same (don't close automatically if already open, or force open)
    setIsPropertiesPanelOpen(true);
    if (form.type === "Section") {
        setIsPropertiesPanelOpen(false);
    }
  };

  const handleContentClick = () => {
    setIsPropertiesPanelOpen(false);
    setSelectedFieldKey(null);
  };

  const handlePropertyChange = (key, value) => {
      if (!selectedFieldKey) return;
      
      if (key === "Default_Value") {
          // Check if value is one of the valid FormTypes (to handle type switching)
          if(Object.keys(formConfig.FormTypes).includes(value)) {
              const newType = value;
              const newTypeProps = formConfig.FormTypes[newType];
              const updates = {
                  ...newTypeProps,
                  type: newType,
                  Default_Value: newType 
              };
              setSelectedForm(prev => updateFieldInTree(prev, selectedFieldKey, updates));
              return;
          }
      } 
      
      const updates = { [key]: value };
      setSelectedForm(prev => updateFieldInTree(prev, selectedFieldKey, updates));
  };
  
  const handleDeleteField = () => {
      if (!selectedFieldKey) return;
      setSelectedForm(prev => deleteFieldFromTree(prev, selectedFieldKey));
      setSelectedFieldKey(null);
      // Do NOT close panel, just clear selection
  };

  const handleUpdateField = () => {
      // Placeholder for update logic - keeping panel open
      // In this state-based app, updates are live, so this is visual confirmation or no-op
  };

  const findFieldInTree = (items, key) => {
      for (const item of items) {
          if (item.key === key) return item;
          if (item.children) {
             const found = findFieldInTree(item.children, key);
             if (found) return found;
          }
      }
      return null;
  };

  const getSelectedField = () => {
    if (!selectedFieldKey) return null;
    return findFieldInTree(selectedForm, selectedFieldKey);
  };

  const renderFormComponent = (form) => {
    const isSelected = form.key === selectedFieldKey;
    const props = {
      ...form, 
      onClick: (e) => handleFieldClick(e, form), 
      isSelected: isSelected,
      renderChildren: (child) => renderFormComponent(child),
      childrenData: form.children
    };

    switch (form.type) {
      case "Section": return <SectionInput key={form.key} {...props} />;
      case "Text": return <TextInput key={form.key} {...props} />;
      case "TextArea": return <TextAreaInput key={form.key} {...props} />;
      case "Number": return <NumberInput key={form.key} {...props} />;
      case "Dropdown": return <DropdownInput key={form.key} {...props} />;
      case "MultiSelect": return <MultiSelectInput key={form.key} {...props} />;
      case "Radio": return <RadioInput key={form.key} {...props} />;
      case "Checkbox": return <CheckboxInput key={form.key} {...props} />;
      case "Date": return <DateInput key={form.key} {...props} />;
      case "DateTime": return <DateTimeInput key={form.key} {...props} />;
      case "FileUpload": return <FileUploadInput key={form.key} {...props} />;
      case "Lookup": return <LookupInput key={form.key} {...props} />;
      case "Repeater": return <RepeaterInput key={form.key} {...props} />;
      case "ColorPicker": return <ColorPickerInput key={form.key} {...props} />;
      case "Label": return <LabelInput key={form.key} {...props} />;
      case "Signature": return <SignatureInput key={form.key} {...props} />;
      case "ComputedFields": return <ComputedFieldsInput key={form.key} {...props} />;
      case "HiddenFields": return <HiddenFieldsInput key={form.key} {...props} />;
      case "Table": return <TableInput key={form.key} {...props} />;
      default: return <DefaultComponent key={form.key} {...props} type={form.type} />;
    }
  };

  const MainAppStyles = `
  .main-app-container {
    position: relative;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .side-panel-main {
    position: fixed;
    top: ${HEADER_HEIGHT}px;
    right: 0;
    width: ${isFormTypesPanelOpen ? "15%" : "0"};
    height: calc(100vh - ${HEADER_HEIGHT}px);
    background-color: #222A45;
    color: white;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${isFormTypesPanelOpen ? "flex-start" : "center"};
    gap: 20px;
    box-shadow: ${isFormTypesPanelOpen ? "-4px 0 8px rgba(0,0,0,0.2)" : "none"};
    padding: ${isFormTypesPanelOpen ? "20px" : "0"};
    overflow-y: auto;
    overflow-x: hidden;
    border-left: ${isFormTypesPanelOpen ? "1px solid #333" : "none"};
  }
  .toggle-handle-main {
    position: fixed;
    top: 50%;
    right: ${isFormTypesPanelOpen ? "15%" : "0"};
    transform: translateY(-50%);
    width: 25px;
    height: 60px;
    background-color: #0B2447;
    color: white;
    border-radius: ${isFormTypesPanelOpen ? "10px 0 0 10px" : "0 10px 10px 0"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  }
  .toggle-handle-main:hover {
    background-color: #19376D;
  }
  .side-panel-main-title { margin: 0; font-size: clamp(1.2rem, 1.5vw, 2rem); color: white; text-align: start; }
  .side-panel-main-subtitle { margin: 0; font-size: clamp(1rem, 1.5vw, 1.5rem); color: white; text-align: start; font-weight: 400; }
  .side-panel-main-list { list-style: none; padding: 0; margin: 0; width: 100%; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex: 1; }
  .side-panel-main-list-item { width: 100%; background-color: #2a3450; padding: 10px 15px; border-radius: 6px; color: white; cursor: pointer; transition: all 0.2s ease-in-out; }
  .side-panel-main-list-item:hover { background-color: #3b4a6e; transform: translateX(5px); }

  .side-panel-properties {
    position: fixed;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    width: ${isPropertiesPanelOpen ? "15%" : "0"};
    height: calc(100vh - ${HEADER_HEIGHT}px);
    background-color: #0B2447;
    color: white;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: ${isPropertiesPanelOpen ? "flex-start" : "center"};
    gap: 20px;
    box-shadow: ${isPropertiesPanelOpen ? "4px 0 8px rgba(0,0,0,0.2)" : "none"};
    padding: ${isPropertiesPanelOpen ? "20px" : "0"};
    overflow-y: auto;
    overflow-x: hidden;
    border-right: ${isPropertiesPanelOpen ? "1px solid #333" : "none"};
  }
  .toggle-handle-properties {
    position: fixed;
    top: 50%;
    left: ${isPropertiesPanelOpen ? "15%" : "0"};
    transform: translateY(-50%);
    width: 25px;
    height: 60px;
    background-color: #0B2447;
    color: white;
    border-radius: ${isPropertiesPanelOpen ? "0 10px 10px 0" : "10px 0 0 10px"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  }
  .toggle-handle-properties:hover {
    background-color: #19376D;
  }
  .panel-row { display:flex; flex-direction: column; padding:8px 0; border-bottom: 1px dashed rgba(255,255,255,0.06); width: 100%; }
  .panel-key { color:#9eb5ff; font-weight:600; margin-bottom: 4px; }
  .panel-input { 
     width: 100%; 
     padding: 6px; 
     background: rgba(0,0,0,0.2); 
     border: 1px solid #444; 
     color: white; 
     border-radius: 4px;
  }
  .panel-input:focus {
     outline: none;
     border-color: #9eb5ff;
     color: #9eb5ff; 
  }

  .boolean-props-container {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     gap: 15px;
     margin-top: 10px;
     padding-top: 10px;
     border-top: 1px dashed rgba(255,255,255,0.1);
  }
  .boolean-group {
     display: flex;
     flex-direction: column;
     gap: 4px;
  }
  .boolean-label {
     color: #9eb5ff;
     font-size: 12px;
     font-weight: 600;
  }
  .checkbox-row {
     display: flex;
     gap: 10px;
  }
  .checkbox-item {
     display: flex;
     align-items: center;
     gap: 4px;
     font-size: 12px;
     color: white;
     cursor: pointer;
  }
  
  .panel-footer {
     width: 100%;
     display: flex;
     gap: 10px;
     margin-top: auto; 
     padding-top: 20px;
  }
  .panel-btn {
     flex: 1;
     padding: 8px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     font-weight: 600;
     transition: opacity 0.2s;
  }
  .btn-delete { background-color: #ef4444; color: white; }
  .btn-update { background-color: #3b82f6; color: white; }
  .panel-btn:hover { opacity: 0.9; }

  .content-area-main {
    margin-left: ${isPropertiesPanelOpen ? "15%" : "0"};
    margin-right: ${isFormTypesPanelOpen ? "18%" : "0"};
    padding: ${HEADER_HEIGHT}px 20px ${FOOTER_HEIGHT}px 20px;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    align-items: flex-start;
    align-content: flex-start; 
    transition: all 0.3s ease-in-out;
  }
  
  .add-section-bar {
     width: 100%;
     display: flex;
     justify-content: left;
     margin-bottom: 20px;
  }
  .add-section-button {
     padding: 10px 20px;
     border-radius: 999px;
     border: 2px solid #0B2447;
     background-color: #fff;
     color: #0B2447;
     font-size: 1rem;
     font-weight: 600;
     cursor: pointer;
     box-shadow: 0 2px 6px rgba(0,0,0,0.08);
     transition: background-color 0.18s, color 0.18s, transform 0.1s;
  }
  .add-section-button:hover {
     background-color: #0B2447;
     color: #fff;
     transform: translateY(-1px);
  }
  .add-section-button:active {
     transform: translateY(0);
  }
  
  .section-wrapper {
     width: 100%;
     flex: 0 0 100%;
     margin-bottom: 20px;
     box-sizing: border-box;
  }
  .section-container {
     border: 2px solid black;
     background-color: rgba(255,255,255,0.5);
     border-radius: 8px;
     padding: 10px;
     min-height: 150px;
     position: relative;
     display: flex;
     flex-direction: column; 
     gap: 10px;
     transition: all 0.2s;
  }
  .section-body {
     display: flex;
     flex-wrap: wrap; 
     width: 100%;
     align-items: flex-start;
  }
  .section-container.section-selected {
     border-color: #3f51b5;
     background-color: rgba(63, 81, 181, 0.05);
     box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }
  .section-header {
     display: flex;
     justify-content: space-between;
     margin-bottom: 10px;
     padding-bottom: 5px;
     border-bottom: 1px solid #ddd;
     color: #0B2447;
  }
  .section-title { font-weight: bold; }
  .section-info { font-size: 0.8em; color: #666; }
  .empty-section-placeholder {
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: center;
     color: #999;
     font-style: italic;
     min-height: 100px;
  }

  .text-wrapper, .textarea-wrapper,
  .number-wrapper, .dropdown-wrapper,
  .multiselect-wrapper, .radio-wrapper,
  .checkbox-wrapper, .date-wrapper,
  .datetime-wrapper, .fileupload-wrapper,
  .lookup-wrapper, .repeater-wrapper,
  .colorpicker-wrapper, .label-wrapper,
  .signature-wrapper, .computedfields-wrapper,
  .hiddenfields-wrapper, .table-wrapper { 
     width: 33.33%; 
     box-sizing: border-box;
     padding: 10px;
  }

  .text-container {
    position: relative; 
    width: 100%;
    margin: 0; 
  }
  .text-field {
    width: 100%; padding: 12px 10px; font-size: 16px; border: 2px solid #0B2447;
    border-radius: 6px; outline: none; background: #fff; color: #0B2447;
    transition: border-color .18s, box-shadow .18s;
    -webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: none;
  }
  select.text-field {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708 .708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 16px 16px;
    cursor: pointer;
  }
  select[multiple].text-field { background-image: none; }
  
  .text-field:focus, .text-field.field-selected {
    border-color: #3f51b5; box-shadow: 0 0 6px rgba(63,81,181,0.18);
  }
  .text-label {
    position: absolute; top: -18px; left: 12px; font-size: 15px;
    color: #0B2447; background-color: transparent; padding: 0 6px; pointer-events: none;
    transition: color .18s;
    text-shadow: 0 0 2px #fff; 
  }
  .text-label.label-selected {
    color: #3f51b5; font-weight: 600;
  }
  
  .textarea-wrapper .text-field { height: 150px; }

  @media (max-width: 1024px) {
    .side-panel-main { width: ${isFormTypesPanelOpen ? "25%" : "0"}; }
    .side-panel-properties { width: ${isPropertiesPanelOpen ? "25%" : "0"}; }
    .content-area-main { 
     margin-right: ${isFormTypesPanelOpen ? "25%" : "0"};
     margin-left: ${isPropertiesPanelOpen ? "25%" : "0"};
    }
    .toggle-handle-main { right: ${isFormTypesPanelOpen ? "25%" : "0"}; }
    .toggle-handle-properties { left: ${isPropertiesPanelOpen ? "25%" : "0"}; }
    .text-wrapper, .textarea-wrapper, .number-wrapper, .dropdown-wrapper,
    .multiselect-wrapper, .radio-wrapper, .checkbox-wrapper, .date-wrapper,
    .datetime-wrapper, .fileupload-wrapper, .lookup-wrapper, .repeater-wrapper,
    .colorpicker-wrapper, .label-wrapper, .signature-wrapper, .computedfields-wrapper,
    .hiddenfields-wrapper, .table-wrapper { width: 50%; }
  }
  @media (max-width: 768px) {
    .side-panel-main { width: ${isFormTypesPanelOpen ? "60%" : "0"}; }
    .side-panel-properties { width: ${isPropertiesPanelOpen ? "60%" : "0"}; }
    .content-area-main { margin-right: 0; margin-left: 0; }
    .toggle-handle-main { right: ${isFormTypesPanelOpen ? "60%" : "0"}; }
    .toggle-handle-properties { left: ${isPropertiesPanelOpen ? "60%" : "0"}; }
    .text-wrapper, .textarea-wrapper, .number-wrapper, .dropdown-wrapper,
    .multiselect-wrapper, .radio-wrapper, .checkbox-wrapper, .date-wrapper,
    .datetime-wrapper, .fileupload-wrapper, .lookup-wrapper, .repeater-wrapper,
    .colorpicker-wrapper, .label-wrapper, .signature-wrapper, .computedfields-wrapper,
    .hiddenfields-wrapper, .table-wrapper { width: 100%; }
  }
  `;
  
  const selectedField = getSelectedField();
  
  // Filtering properties to show
  const ignoredKeys = ['id', 'key', 'type', 'children']; // Kept 'label' removed from ignored keys
  const booleanKeys = ['Required', 'Readonly', 'Visible'];
  
  const allProps = selectedField ? Object.keys(selectedField).filter(k => !ignoredKeys.includes(k)) : [];
  
  // Split into text inputs and boolean checkboxes
  const textProps = allProps.filter(k => !booleanKeys.includes(k));
  const boolProps = allProps.filter(k => booleanKeys.includes(k));
  
  // List of all available types for the dropdown
  const availableTypes = Object.keys(formConfig.FormTypes).filter(t => t !== "Section");

  return (
    <div className="main-app-container">
      <style>{MainAppStyles}</style>
      <div className="toggle-handle-properties" onClick={() => setIsPropertiesPanelOpen((prev) => !prev)}>
        {isPropertiesPanelOpen ? "❮" : "❯"}
      </div>
      <div className="side-panel-properties">
        {isPropertiesPanelOpen && (
          <>
            <div>
              <h1 className="side-panel-main-title">{selectedField ? "Properties" : "Properties"}</h1>
              {!selectedField && <p style={{ padding: "0 10px" }}>Click a field in the form to see its properties.</p>}
              
              {/* Render Text Properties */}
              {selectedField && textProps.map((key) => (
                <div className="panel-row" key={key}>
                  <div className="panel-key">{key}</div>
                  {key === 'Default_Value' ? (
                      // Type Switcher Dropdown
                      <select 
                          className="panel-input"
                          value={selectedField[key] || ""} 
                          onChange={(e) => handlePropertyChange(key, e.target.value)}
                      >
                          {availableTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                  ) : (
                      <input 
                       className="panel-input"
                       value={selectedField[key] || ""} 
                       onChange={(e) => handlePropertyChange(key, e.target.value)}
                      />
                  )}
                </div>
              ))}

              {/* Render Boolean Properties (2 Checkboxes Side-by-Side) */}
              {selectedField && boolProps.length > 0 && (
                <div className="boolean-props-container">
                  {boolProps.map((key) => (
                    <div className="boolean-group" key={key}>
                        <div className="boolean-label">{key}</div>
                        <div className="checkbox-row">
                            <label className="checkbox-item">
                                <input 
                                type="checkbox"
                                checked={selectedField[key] === "true"} 
                                onChange={() => handlePropertyChange(key, "true")}
                                />
                                True
                            </label>
                            <label className="checkbox-item">
                                <input 
                                type="checkbox"
                                checked={selectedField[key] === "false"} 
                                onChange={() => handlePropertyChange(key, "false")}
                                />
                                False
                            </label>
                        </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="panel-footer">
                <button className="panel-btn btn-delete" onClick={handleDeleteField}>Delete</button>
                <button className="panel-btn btn-update" onClick={handleUpdateField}>Update</button>
            </div>

          </>
        )}
      </div>
      <div className="toggle-handle-main" onClick={() => setIsFormTypesPanelOpen((prev) => !prev)}>
        {isFormTypesPanelOpen ? "❯" : "❮"}
      </div>
      <div className="side-panel-main">
        {isFormTypesPanelOpen && (
          <>
            <h1 className="side-panel-main-title">Form Types</h1>
            <h2 className="side-panel-main-subtitle">Add a Field</h2>
            <ul className="side-panel-main-list">
              {formTypes.map((item, index) => (
                <li key={index} className="side-panel-main-list-item" onClick={() => handleAddField(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="content-area-main" onClick={handleContentClick}>
        <div className="add-section-bar" onClick={(e) => e.stopPropagation()}>
            <button className="add-section-button" onClick={handleAddSection}>+ Add Section</button>
        </div>
        {selectedForm.length === 0 && (
          <div style={{ padding: "40px", color: "#666", fontSize: "1.2rem", width: '100%', textAlign: 'center', marginTop: '10%' }}>
            Click <strong>+ Add Section</strong> to start.
          </div>
        )}
        {selectedForm.map((form) => renderFormComponent(form))}
      </div>
    </div>
  );
}