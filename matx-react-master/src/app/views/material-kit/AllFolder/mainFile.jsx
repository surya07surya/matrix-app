import React, { useState } from "react";
import formConfig from "../../../../config/formConfig";
import {
  insertFieldIntoTree,
  updateFieldInTree,
  deleteFieldFromTree,
  findKeyInTree,
  findFieldInTree,
} from "../../../../helpers/treeHelpers";
import "./styles/MainApp.css";

// ===== FIELD COMPONENTS =====
import SectionInput from "../../../components/fields/SectionInput";
import TextInput from "../../../components/fields/TextInput";
import TextAreaInput from "../../../components/fields/TextAreaInput";
import NumberInput from "../../../components/fields/NumberInput";
import DropdownInput from "../../../components/fields/DropdownInput";
import MultiSelectInput from "../../../components/fields/MultiSelectInput";
import RadioInput from "../../../components/fields/RadioInput";
import CheckboxInput from "../../../components/fields/CheckboxInput";
import DateInput from "../../../components/fields/DateInput";
import DateTimeInput from "../../../components/fields/DateTimeInput";
import FileUploadInput from "../../../components/fields/FileUploadInput";
import LookupInput from "../../../components/fields/LookupInput";
import ColorPickerInput from "../../../components/fields/ColorPickerInput";
import LabelInput from "../../../components/fields/LabelInput";
import SignatureInput from "../../../components/fields/SignatureInput";
import ComputedFieldsInput from "../../../components/fields/ComputedFieldsInput";
import HiddenFieldsInput from "../../../components/fields/HiddenFieldsInput";
import RepeaterInput from "../../../components/fields/RepeaterInput";
import DefaultComponent from "../../../components/fields/DefaultComponent";

export default function App() {
  // ================= STATE =================
  const [selectedForm, setSelectedForm] = useState([]);
  const [isFormTypesPanelOpen, setIsFormTypesPanelOpen] = useState(true);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [selectedFieldKey, setSelectedFieldKey] = useState(null);
  const [moveFieldKey, setMoveFieldKey] = useState(null);

  const formTypes = Object.keys(formConfig.FormTypes).filter(
    (t) => t !== "Section"
  );

  const initialCounters = Object.keys(formConfig.FormTypes).reduce(
    (acc, type) => ({ ...acc, [type]: 0 }),
    {}
  );
  const [fieldCounters, setFieldCounters] = useState(initialCounters);

  // ================= HANDLERS =================

  const handleContentClick = () => {
    setSelectedFieldKey(null);
    setIsPropertiesPanelOpen(false);
  };

  const handleAddSection = () => {
    const nextId = fieldCounters.Section + 1;
    const newKey = `Section-${nextId}`;

    const newItem = {
      ...formConfig.FormTypes.Section,
      type: "Section",
      key: newKey,
      id: nextId,
      children: [],
    };

    setFieldCounters((p) => ({ ...p, Section: nextId }));
    setSelectedForm((p) => [...p, newItem]);
    setSelectedFieldKey(newKey);
    setIsPropertiesPanelOpen(false);
  };

  const handleAddField = (type) => {
    const nextId = fieldCounters[type] + 1;
    const newKey = `${type}-${nextId}`;

    const newItem = {
      ...formConfig.FormTypes[type],
      type,
      key: newKey,
      id: nextId,
    };

    setFieldCounters((p) => ({ ...p, [type]: nextId }));

    if (selectedFieldKey && findKeyInTree(selectedForm, selectedFieldKey)) {
      setSelectedForm((p) =>
        insertFieldIntoTree(p, selectedFieldKey, newItem)
      );
    } else {
      setSelectedForm((p) => [...p, newItem]);
    }

    setSelectedFieldKey(newKey);
    setIsPropertiesPanelOpen(true);
  };

  const handleFieldClick = (e, form) => {
    e.stopPropagation();
    setSelectedFieldKey(form.key);

    if (form.type !== "Section") {
      setMoveFieldKey(form.key);
      setIsPropertiesPanelOpen(true);
    } else {
      setIsPropertiesPanelOpen(false);
    }
  };

  const handleSectionDrop = (sectionKey) => {
    if (!moveFieldKey) return;

    const field = findFieldInTree(selectedForm, moveFieldKey);
    if (!field) return;

    let updated = deleteFieldFromTree(selectedForm, moveFieldKey);
    updated = insertFieldIntoTree(updated, sectionKey, field);

    setSelectedForm(updated);
    setMoveFieldKey(null);
    setSelectedFieldKey(sectionKey);
  };

  const handlePropertyChange = (key, value) => {
    if (!selectedFieldKey) return;
    setSelectedForm((p) =>
      updateFieldInTree(p, selectedFieldKey, { [key]: value })
    );
  };

  const handleDeleteField = () => {
    if (!selectedFieldKey) return;
    setSelectedForm((p) => deleteFieldFromTree(p, selectedFieldKey));
    setSelectedFieldKey(null);
  };

  // ================= RENDER =================

  const renderFormComponent = (form) => {
    const isSelected = form.key === selectedFieldKey;
    const { key, children, ...rest } = form;

    const props = {
      ...rest,
      isSelected,
      onClick: (e) => handleFieldClick(e, form),
      renderChildren: (c) => renderFormComponent(c),
      childrenData: form.children,
      draggable: form.type !== "Section",
      onDragStart: () => setMoveFieldKey(form.key),
    };

    switch (form.type) {
      case "Section":
        return (
          <SectionInput
            key={form.key}
            {...props}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleSectionDrop(form.key)}
          />
        );

      case "Text":
        return <TextInput key={form.key} {...props} />;
      case "TextArea":
        return <TextAreaInput key={form.key} {...props} />;
      case "Number":
        return <NumberInput key={form.key} {...props} />;
      case "Dropdown":
        return <DropdownInput key={form.key} {...props} />;
      case "MultiSelect":
        return <MultiSelectInput key={form.key} {...props} />;
      case "Radio":
        return <RadioInput key={form.key} {...props} />;
      case "Checkbox":
        return <CheckboxInput key={form.key} {...props} />;
      case "Date":
        return <DateInput key={form.key} {...props} />;
      case "DateTime":
        return <DateTimeInput key={form.key} {...props} />;
      case "FileUpload":
        return <FileUploadInput key={form.key} {...props} />;
      case "Lookup":
        return <LookupInput key={form.key} {...props} />;
      case "Repeater":
        return <RepeaterInput key={form.key} {...props} />;
      case "ColorPicker":
        return <ColorPickerInput key={form.key} {...props} />;
      case "Label":
        return <LabelInput key={form.key} {...props} />;
      case "Signature":
        return <SignatureInput key={form.key} {...props} />;
      case "ComputedFields":
        return <ComputedFieldsInput key={form.key} {...props} />;
      case "HiddenFields":
        return <HiddenFieldsInput key={form.key} {...props} />;
      default:
        return <DefaultComponent key={form.key} {...props} type={form.type} />;
    }
  };

  // ================= JSX =================
  return (
    <div className="main-app-container">
      <div
        className="toggle-handle-properties"
        onClick={() => setIsPropertiesPanelOpen((p) => !p)}
      >
        {isPropertiesPanelOpen ? "❮" : "❯"}
      </div>

      <div className="side-panel-properties" />

      <div
        className="toggle-handle-main"
        onClick={() => setIsFormTypesPanelOpen((p) => !p)}
      >
        {isFormTypesPanelOpen ? "❯" : "❮"}
      </div>

      <div className="side-panel-main">
        {isFormTypesPanelOpen && (
          <>
            <h1 className="side-panel-main-title">Form Types</h1>
            <ul className="side-panel-main-list">
              {formTypes.map((t) => (
                <li
                  key={t}
                  className="side-panel-main-list-item"
                  onClick={() => handleAddField(t)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="content-area-main" onClick={handleContentClick}>
        <div className="add-section-bar">
          <button className="add-section-button" onClick={handleAddSection}>
            + Add Section
          </button>
        </div>

        {selectedForm.map((f) => renderFormComponent(f))}
      </div>
    </div>
  );
}

