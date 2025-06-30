export const sortByKey = (data, sortConfig) => {
  if (sortConfig.key === "age") {
    return [...data].sort((a, b) => {
      const ageA = +a.age;
      const ageB = +b.age;
      return sortConfig.direction === "asc" ? ageA - ageB : ageB - ageA;
    });
  }
  return data;
};
