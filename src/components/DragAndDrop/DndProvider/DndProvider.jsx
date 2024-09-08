import { createContext } from 'react';
import { useDnd } from '@/hooks/useDnd';

export const DndContext = createContext();

export function DndProvider({ children }) {
  const {
    dndData,
    invalidLayout,
    selectedItems,
    handleSelectItem,
    onDragUpdate,
    onDragEnd,
    resetBoard,
    invalidCol,
  } = useDnd(12, 4);

  return (
    <DndContext.Provider
      value={{
        dndData,
        invalidLayout,
        selectedItems,
        handleSelectItem,
        onDragUpdate,
        onDragEnd,
        resetBoard,
        invalidCol,
      }}
    >
      {children}
    </DndContext.Provider>
  );
}

export default DndProvider;
