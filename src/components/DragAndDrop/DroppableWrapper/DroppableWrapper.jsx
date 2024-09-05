import * as S from './DroppableWrapper.styles';
import { Droppable } from 'react-beautiful-dnd';
import DraggableWrapper from '@/components/DragAndDrop/DraggableWrapper/DraggableWrapper';

function DroppableWrapper({ columnData, itemsData }) {
  return (
    <S.ColumnContainer>
      <S.ColumnTitle>{columnData.title}</S.ColumnTitle>
      <Droppable droppableId={columnData.id}>
        {(provided, snapshot) => (
          <S.Column
            {...provided.droppableProps}
            ref={provided.innerRef}
            $isDraggingOver={snapshot.isDraggingOver} // styled-components props가 dom으로 전달되지 않음
          >
            {itemsData.map((item, idx) => (
              <DraggableWrapper key={item.id} itemData={item} idx={idx} />
            ))}
            {provided.placeholder}
          </S.Column>
        )}
      </Droppable>
    </S.ColumnContainer>
  );
}

export default DroppableWrapper;
