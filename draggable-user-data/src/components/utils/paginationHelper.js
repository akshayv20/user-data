
export function getPaginatedData(data, currentPage, limit) {
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
}

export function getTotalPages(size, limit) {
  return Math.ceil(size / limit);
}
