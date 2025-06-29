export const sortByKey = (data, sortConfig) => {
  if (sortConfig.key === "age") {
    return [...data].sort((a, b) => {
      const ageA = parseInt(a.age, 10);
      const ageB = parseInt(b.age, 10);
      return sortConfig.direction === "asc" ? ageA - ageB : ageB - ageA;
    });
  }
  return data;
};
