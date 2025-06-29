// import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { fetchStart, fetchSuccess, fetchFailure } from "../app/tableSlice";
// import { dummyData } from "../Asset/data";
// import "./DraggableTable.css";

// const DraggableTable = () => {
//   const dispatch = useDispatch();

//   const { data, loading, error } = useSelector((state) => state.table);

//   const [columns, setColumns] = useState(
//     JSON.parse(localStorage.getItem("columns")) || ["name", "email", "age"]
//   );
//   const [draggedCol, setDraggedCol] = useState(null);
//   const [currentPage, setCurrentPage] = useState(
//     parseInt(localStorage.getItem("page")) || 1
//   );
//   const [entriesPerPage, setEntriesPerPage] = useState(
//     parseInt(localStorage.getItem("entriesPerPage")) || 5
//   );
//   const [sortConfig, setSortConfig] = useState(
//     JSON.parse(localStorage.getItem("sortConfig")) || {
//       key: null,
//       direction: "asc"
//     }
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(fetchStart());
//       try {
//         const response = await axios.get(
//           "https://run.mocky.io/v3/01238aa1-35de-4015-9add-6d3e1c5e2b30"
//         );
//         dispatch(fetchSuccess(response.data));
//       } catch (err) {
//         console.warn("Fetching failed, using dummy data");
//         dispatch(fetchSuccess(dummyData)); // fallback to dummy
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     localStorage.setItem("columns", JSON.stringify(columns));
//   }, [columns]);

//   useEffect(() => {
//     localStorage.setItem("page", currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     localStorage.setItem("entriesPerPage", entriesPerPage);
//   }, [entriesPerPage]);

//   useEffect(() => {
//     localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
//   }, [sortConfig]);

//   const handleDragStart = (col) => setDraggedCol(col);

//   const handleDrop = (col) => {
//     const newColumns = [...columns];
//     const fromIndex = newColumns.indexOf(draggedCol);
//     const toIndex = newColumns.indexOf(col);
//     newColumns.splice(fromIndex, 1);
//     newColumns.splice(toIndex, 0, draggedCol);
//     setColumns(newColumns);
//     setDraggedCol(null);
//   };

//   const handleSort = (col) => {
//     if (col !== "age") return;
//     const direction =
//       sortConfig.key === col && sortConfig.direction === "asc" ? "desc" : "asc";
//     setSortConfig({ key: col, direction });
//   };

//   const sortedData = React.useMemo(() => {
//     if (sortConfig.key === "age") {
//       return [...data].sort((a, b) => {
//         const ageA = parseInt(a.age, 10);
//         const ageB = parseInt(b.age, 10);
//         return sortConfig.direction === "asc" ? ageA - ageB : ageB - ageA;
//       });
//     }
//     return data;
//   }, [data, sortConfig]);

//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const totalPages = Math.ceil(sortedData.length / entriesPerPage);
//   if (loading) return <p className="loading">Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div className='table-wrapper'>
//       <h1 className='table-title'>Draggable Table</h1>
//       <div className='pagination-controls top'>
//         <div className='entries-per-page'>
//           Show{" "}
//           <select
//             value={entriesPerPage}
//             onChange={(e) => {
//               setEntriesPerPage(parseInt(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             {[5, 10, 20].map((n) => (
//               <option key={n} value={n}>
//                 {n}
//               </option>
//             ))}
//           </select>{" "}
//           entries per page
//         </div>
//       </div>

//       <table className='data-table'>
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col}
//                 draggable
//                 onDragStart={() => handleDragStart(col)}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={() => handleDrop(col)}
//                 onClick={() => handleSort(col)}
//                 className='draggable-header'
//               >
//                 {col.charAt(0).toUpperCase() + col.slice(1)}
//                 {col === "age" && sortConfig.key === "age" && (
//                   <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((item, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td key={col}>{item[col]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className='pagination-controls'>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DraggableTable;

// src/components/DraggableTable.js

// src/components/DraggableTable.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "./hooks/useFetchData";
import { sortByKey } from "./utils/sortHelper";
import { handleDragStart, handleDrop } from "./utils/dragUtils";
import "./DraggableTable.css";

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
  const [entriesPerPage, setEntriesPerPage] = useState(
    parseInt(localStorage.getItem("entriesPerPage")) || 5
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
    localStorage.setItem("entriesPerPage", entriesPerPage);
  }, [entriesPerPage]);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handleSort = (col) => {
    if (col !== "age") return;
    const direction =
      sortConfig.key === col && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: col, direction });
  };

  const sortedData = React.useMemo(() => {
    return sortByKey(data, sortConfig);
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='table-wrapper'>
      <h1 className='table-title'>Draggable Table</h1>
      <div className='pagination-controls top'>
        <div className='entries-per-page'>
          Show &nbsp;
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          &nbsp; entries per page
        </div>
      </div>

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
                  <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
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

      <div className='pagination-controls'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DraggableTable;
