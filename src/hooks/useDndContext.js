import { useContext } from 'react';
import { DndContext } from '@/components/DragAndDrop/DndProvider/DndProvider';

export const useDndContext = () => {
  const context = useContext(DndContext);

  if (!context) {
    throw new Error('useDndContext must be used within an DndProvider');
  }

  return context;
};
