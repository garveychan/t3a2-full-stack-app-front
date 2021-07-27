// Helper function for mapping ids to meaningful information and vice versa.
// Currently used for experience level categories stored in the database
// and retrieved via their individual ids, but can be repurposed for
// extended categories in the future.

export const mapCategories = (array, item, fromType, toType) => {
  if (!array) return "";

  for (const el of array) {
    if (el[fromType] === item) return el[toType];
  }

  return ""
};
