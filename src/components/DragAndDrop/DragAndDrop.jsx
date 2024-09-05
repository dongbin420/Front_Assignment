import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from './DroppableWrapper/DroppableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DragAndDrop() {
  const { onDragEnd } = useDndContext();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableWrapper />
    </DragDropContext>
  );
}

export default DragAndDrop;
