//  import { useState } from "react";
 
//    
//  export default MainAppStyles
export function getMainAppStyles({
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  isFormTypesPanelOpen,
  isPropertiesPanelOpen,
}) {
  return `
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
}

