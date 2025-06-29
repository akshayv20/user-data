export const handleDragStart = (col, setDraggedCol) => {
  setDraggedCol(col);
};

export const handleDrop = (
  col,
  columns,
  setColumns,
  draggedCol,
  setDraggedCol
) => {
  const newColumns = [...columns];
  const fromIndex = newColumns.indexOf(draggedCol);
  const toIndex = newColumns.indexOf(col);
  newColumns.splice(fromIndex, 1);
  newColumns.splice(toIndex, 0, draggedCol);
  setColumns(newColumns);
  setDraggedCol(null);
};
