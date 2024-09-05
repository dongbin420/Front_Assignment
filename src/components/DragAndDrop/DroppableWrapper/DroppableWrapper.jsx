import { Droppable } from 'react-beautiful-dnd';
import DraggableWrapper from '@/components/DragAndDrop/DraggableWrapper/DraggableWrapper';
import { useDndContext } from '@/hooks/useDndContext';
import { getListStyle } from '@/utils/dndUtils';

function DroppableWrapper() {
  const { items } = useDndContext();

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map((item, index) => (
            <DraggableWrapper key={item.id} draggableId={item.id} index={index} item={item} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableWrapper;
