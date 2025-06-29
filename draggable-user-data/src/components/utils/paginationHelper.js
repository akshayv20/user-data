// utils/paginationHelper.js

export function getPaginatedData(data, currentPage, entriesPerPage) {
  const start = (currentPage - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  return data.slice(start, end);
}

export function getTotalPages(dataLength, entriesPerPage) {
  return Math.ceil(dataLength / entriesPerPage);
}
