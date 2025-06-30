import React from "react";
import "./styles.css";

const PaginationControls = ({
  currentPage,
  totalPages,
  limit,
  setLimit,
  setCurrentPage
}) => {
  return (
    <div className='pagination-controls'>
      <div className='entries-per-page'>
        Show &nbsp;
        <select
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 40].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        &nbsp; entries per page
      </div>

      <div className='page-navigation'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        &nbsp;
        <span>
          Page {currentPage} of {totalPages}
        </span>
        &nbsp;
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
