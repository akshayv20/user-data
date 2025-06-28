import {
  SET_DATA,
  REORDER_COLUMNS,
  SORT_DATA,
  SET_ENTRIES_PER_PAGE,
  SET_CURRENT_PAGE
} from "./actions";

const initialState = {
  data: [],
  columns: ["name", "email", "age"],
  entriesPerPage: 5,
  currentPage: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case REORDER_COLUMNS:
      return { ...state, columns: action.payload };
    case SORT_DATA:
      return { ...state, data: action.payload };
    case SET_ENTRIES_PER_PAGE:
      return { ...state, entriesPerPage: action.payload, currentPage: 1 };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default reducer;
