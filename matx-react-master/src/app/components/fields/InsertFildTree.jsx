import React from "react";

  export const insertFieldIntoTree = (items, targetKey, newField) => {
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


