// Insert a field into a section
export const insertFieldIntoTree = (items, targetKey, newField) => {
  return items.map(item => {
    if (item.key === targetKey && item.type === "Section") {
      return {
        ...item,
        children: [...(item.children || []), newField],
      };
    }

    if (item.children) {
      return {
        ...item,
        children: insertFieldIntoTree(item.children, targetKey, newField),
      };
    }

    return item;
  });
};

// Update field properties
export const updateFieldInTree = (items, targetKey, newProps) => {
  return items.map(item => {
    if (item.key === targetKey) {
      return { ...item, ...newProps };
    }

    if (item.children) {
      return {
        ...item,
        children: updateFieldInTree(item.children, targetKey, newProps),
      };
    }

    return item;
  });
};

// Delete a field
export const deleteFieldFromTree = (items, targetKey) => {
  return items
    .filter(item => item.key !== targetKey)
    .map(item => ({
      ...item,
      children: item.children
        ? deleteFieldFromTree(item.children, targetKey)
        : [],
    }));
};

// Check if key exists in tree
export const findKeyInTree = (items, targetKey) => {
  for (const item of items) {
    if (item.key === targetKey) return true;
    if (item.children && findKeyInTree(item.children, targetKey)) return true;
  }
  return false;
};

// Find and return a field
export const findFieldInTree = (items, key) => {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children) {
      const found = findFieldInTree(item.children, key);
      if (found) return found;
    }
  }
  return null;
};

