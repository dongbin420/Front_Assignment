import * as S from './DroppableWrapper.styles';
import { Droppable } from 'react-beautiful-dnd';
import DraggableWrapper from '@/components/DragAndDrop/DraggableWrapper/DraggableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DroppableWrapper() {
  const { items } = useDndContext();

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <S.List
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {items.map((item, index) => (
            <DraggableWrapper key={item.id} draggableId={item.id} index={index} item={item} />
          ))}
          {provided.placeholder}
        </S.List>
      )}
    </Droppable>
  );
}

export default DroppableWrapper;
