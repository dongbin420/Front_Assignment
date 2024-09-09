import * as S from './DroppableWrapper.styles';
import { Droppable } from 'react-beautiful-dnd';
import DraggableWrapper from '@/components/DragAndDrop/DraggableWrapper/DraggableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DroppableWrapper({ columnData, itemsData }) {
  const { invalidLayout, invalidCol } = useDndContext();
  const isDropImpossibleWhileUpdate = invalidLayout.droppableId === columnData.id;
  const isDropImpossibleAfterEnd = invalidCol === columnData.id;

  return (
    <S.ColumnContainer $isDropImpossibleAfterEnd={isDropImpossibleAfterEnd}>
      <S.ColumnTitle>{columnData.title}</S.ColumnTitle>
      <Droppable droppableId={columnData.id}>
        {(provided, snapshot) => (
          <S.Column
            {...provided.droppableProps}
            ref={provided.innerRef}
            $isDraggingOver={snapshot.isDraggingOver}
            $isDropImpossibleWhileUpdate={isDropImpossibleWhileUpdate}
          >
            {itemsData.map((item, idx) => (
              <DraggableWrapper key={item.id} itemData={item} idx={idx} columnId={columnData.id} />
            ))}
            {provided.placeholder}
          </S.Column>
        )}
      </Droppable>
    </S.ColumnContainer>
  );
}

export default DroppableWrapper;
