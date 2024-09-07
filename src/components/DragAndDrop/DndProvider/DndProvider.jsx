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
      }}
    >
      {children}
    </DndContext.Provider>
  );
}

export default DndProvider;
