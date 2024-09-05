import { createContext } from 'react';
import { useDnd } from '@/hooks/useDnd';

export const DndContext = createContext();

export function DndProvider({ children }) {
  const { dndData, onDragEnd } = useDnd(12, 4);

  return <DndContext.Provider value={{ dndData, onDragEnd }}>{children}</DndContext.Provider>;
}

export default DndProvider;
