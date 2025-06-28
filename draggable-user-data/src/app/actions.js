export const SET_DATA = "SET_DATA";
export const REORDER_COLUMNS = "REORDER_COLUMNS";
export const SORT_DATA = "SORT_DATA";
export const SET_ENTRIES_PER_PAGE = "SET_ENTRIES_PER_PAGE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const setData = (data) => ({ type: SET_DATA, payload: data });
export const reorderColumns = (columns) => ({
  type: REORDER_COLUMNS,
  payload: columns
});
export const sortData = (data) => ({ type: SORT_DATA, payload: data });
export const setEntriesPerPage = (value) => ({
  type: SET_ENTRIES_PER_PAGE,
  payload: value
});
export const setCurrentPage = (value) => ({
  type: SET_CURRENT_PAGE,
  payload: value
});
