
export function getPaginatedData(data, currentPage, limit) {
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  return data.slice(start, end);
}

export function getTotalPages(size, limit) {
  return Math.ceil(size / limit);
}
