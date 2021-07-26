export const mapCategories = (array, item, fromType, toType) => {
  if (!array) return;

  for (const el of array) {
    if (el[fromType] === item) return el[toType];
  }
};
