import * as S from './DraggableWrapper.styles';
import { Draggable } from 'react-beautiful-dnd';

function DraggableWrapper({ draggableId, index, item }) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <S.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {item.content}
        </S.Item>
      )}
    </Draggable>
  );
}

export default DraggableWrapper;
