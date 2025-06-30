import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../hooks/useFetchData";
import { sortByKey } from "../utils/sortHelper";
import { handleDragStart, handleDrop } from "../utils/dragUtils";
import { getPaginatedData, getTotalPages } from "../utils/paginationHelper";
import "./styles.css";
import PaginationControls from "./PaginationControls";

const DraggableTable = () => {
  const dispatch = useDispatch();
  const fetchData = useFetchData();

  const { data, loading, error } = useSelector((state) => state.table);

  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || ["name", "email", "age"]
  );
  const [draggedCol, setDraggedCol] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("page")) || 1
  );
  const [limit, setLimit] = useState(
    parseInt(localStorage.getItem("limit")) || 5
  );
  const [sortConfig, setSortConfig] = useState(
    JSON.parse(localStorage.getItem("sortConfig")) || {
      key: null,
      direction: "asc"
    }
  );

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("limit", limit);
  }, [limit]);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handleSort = (col) => {
    if (col !== "age") return;
    const isAsc = sortConfig.direction === "asc";
    setSortConfig({ key: col, direction: isAsc ? "desc" : "asc" });
  };

  const sortedData = useMemo(() => {
    return sortByKey(data, sortConfig);
  }, [data, sortConfig]);

  const paginatedData = getPaginatedData(sortedData, currentPage, limit);
  const totalPages = getTotalPages(sortedData.length, limit);

  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='table-wrapper'>
      <h1 className='table-title'>Draggable Table</h1>

      <table className='data-table'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                draggable
                onDragStart={() => handleDragStart(col, setDraggedCol)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() =>
                  handleDrop(
                    col,
                    columns,
                    setColumns,
                    draggedCol,
                    setDraggedCol
                  )
                }
                onClick={() => handleSort(col)}
                className='draggable-header'
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                {col === "age" && sortConfig.key === "age" && (
                  <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{item[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DraggableTable;
