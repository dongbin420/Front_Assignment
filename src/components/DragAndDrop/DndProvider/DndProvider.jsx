import { createContext } from 'react';
import { useDnd } from '@/hooks/useDnd';

export const DndContext = createContext();

export function DndProvider({ children }) {
  const {
    dndData,
    invalidItem,
    selectedItems,
    handleSelectItem,
    onDragUpdate,
    onDragEnd,
    resetBoard,
    impossibleCol,
  } = useDnd(12, 4);

  return (
    <DndContext.Provider
      value={{
        dndData,
        invalidItem,
        selectedItems,
        handleSelectItem,
        onDragUpdate,
        onDragEnd,
        resetBoard,
        impossibleCol,
      }}
    >
      {children}
    </DndContext.Provider>
  );
}

export default DndProvider;
