import React, { useState, useEffect, useRef } from "react";
import formConfig  from "../../../../config/formConfig";
import SectionInput from "app/components/fields/SectionInput";
import TableInput from "app/components/fields/Tableinput";
import TextInput from "app/components/fields/TextInput";
import TextAreaInput from "app/components/fields/TextAreaInput";
import NumberInput from "app/components/fields/NumberInput";
import DropdownInput from "app/components/fields/DropdownInput";
import MultiSelectInput from "app/components/fields/MultiSelectInput";
import CheckboxInput from "app/components/fields/CheckboxInput";
import RadioInput from "app/components/fields/RadioInput";
import DateInput from "app/components/fields/DateInput";
import DateTimeInput from "app/components/fields/DateTimeInput";
import FileUploadInput from "app/components/fields/FileUploadInput";
import LookupInput from "app/components/fields/LookupInput";
import ColorPickerInput from "app/components/fields/ColorPickerInput";
import LabelInput from "app/components/fields/LabelInput";
import SignatureInput from "app/components/fields/SignatureInput";
import ComputedFieldsInput from "app/components/fields/ComputedFieldsInput";
import HiddenFieldsInput from "app/components/fields/HiddenFieldsInput";
import RepeaterInput from "app/components/fields/RepeaterInput";
import DefaultComponent from "app/components/fields/DefaultComponent";
import { insertFieldIntoTree } from "app/components/fields/InsertFildTree";
// --- SECTION 4: MAIN APP COMPONENT ---
import { getMainAppStyles } from "app/components/fields/Mainstyle";
const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 64;

export default function App() {
  // ✅ ADD (do not remove anything else)
const [draggedFieldKey, setDraggedFieldKey] = useState(null);
  const [selectedForm, setSelectedForm] = useState([]);
  const [isFormTypesPanelOpen, setIsFormTypesPanelOpen] = useState(true); 
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false); 
  const [selectedFieldKey, setSelectedFieldKey] = useState(null); 

  // ✅ ADD
const removeFieldFromTree = (items, targetKey) => {
  return items
    .map(item => {
      if (item.children) {
        item.children = removeFieldFromTree(item.children, targetKey);
      }
      return item;
    })
    .filter(item => item.key !== targetKey);
};

// ✅ ADD
const handleDropIntoSection = (sectionKey) => {
  if (!draggedFieldKey) return;

  let draggedItem = null;

  const findDragged = (items) => {
    for (const item of items) {
      if (item.key === draggedFieldKey) {
        draggedItem = item;
        return;
      }
      if (item.children) findDragged(item.children);
    }
  };

  findDragged(selectedForm);
  if (!draggedItem) return;

  let updatedForm = removeFieldFromTree(selectedForm, draggedFieldKey);
  updatedForm = insertFieldIntoTree(updatedForm, sectionKey, draggedItem);

  setSelectedForm(updatedForm);
  setDraggedFieldKey(null);
};


const MainAppStyles = getMainAppStyles({
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  isFormTypesPanelOpen,
  isPropertiesPanelOpen,
});
  
  const formTypes = Object.keys(formConfig.FormTypes).filter(type => type !== "Section");

  const initialCounters = Object.keys(formConfig.FormTypes).reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  const [fieldCounters, setFieldCounters] = useState(initialCounters);

  // Recursive helper to insert fields (unchanged)
 
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

  // ⬇️ remove key from form
  const { key, ...formWithoutKey } = form;

const props = {
  ...formWithoutKey,
  onClick: (e) => handleFieldClick(e, form),
  isSelected,
  renderChildren: (child) => renderFormComponent(child),
  childrenData: form.children,

  // ✅ ADD FROM HERE
  draggable: form.type !== "Section",
  onDragStart: (e) => {
    console.log("drag started", form.key);
    e.dataTransfer.setData("fieldKey", form.key);
    setDraggedFieldKey(form.key);
  },
  // ✅ ADD TILL HERE
};



  switch (form.type) {
case "Section":
  return (
    <SectionInput
      key={key}
      {...props}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDropIntoSection(form.key)}
      onChildDragStart={(fieldKey) => {
        console.log("drag started", fieldKey);
        setDraggedFieldKey(fieldKey);
      }}
    />
  );


    case "Text":
      return <TextInput key={key} {...props} />;

    case "TextArea":
      return <TextAreaInput key={key} {...props} />;

    case "Number":
      return <NumberInput key={key} {...props} />;

    case "Dropdown":
      return <DropdownInput key={key} {...props} />;

    case "MultiSelect":
      return <MultiSelectInput key={key} {...props} />;

    case "Radio":
      return <RadioInput key={key} {...props} />;

    case "Checkbox":
      return <CheckboxInput key={key} {...props} />;

    case "Date":
      return <DateInput key={key} {...props} />;

    case "DateTime":
      return <DateTimeInput key={key} {...props} />;

    case "FileUpload":
      return <FileUploadInput key={key} {...props} />;

    case "Lookup":
      return <LookupInput key={key} {...props} />;

    case "Repeater":
      return <RepeaterInput key={key} {...props} />;

    case "ColorPicker":
      return <ColorPickerInput key={key} {...props} />;

    case "Label":
      return <LabelInput key={key} {...props} />;

    case "Signature":
      return <SignatureInput key={key} {...props} />;

    case "ComputedFields":
      return <ComputedFieldsInput key={key} {...props} />;

    case "HiddenFields":
      return <HiddenFieldsInput key={key} {...props} />;

    case "Table":
      return <TableInput key={key} {...props} />;

    default:
      return <DefaultComponent key={key} {...props} type={form.type} />;
  }
};



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
        {

          //side pannel
         
        }
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


