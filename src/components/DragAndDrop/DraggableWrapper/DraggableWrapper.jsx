import * as S from './DraggableWrapper.styles';
import { Draggable } from 'react-beautiful-dnd';

function DraggableWrapper({ itemData, idx }) {
  return (
    <Draggable draggableId={itemData.id} index={idx}>
      {(provided, snapshot) => (
        <S.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging} // styled-components props가 dom으로 전달되지 않음
        >
          {itemData.content}
        </S.Item>
      )}
    </Draggable>
  );
}

export default DraggableWrapper;
