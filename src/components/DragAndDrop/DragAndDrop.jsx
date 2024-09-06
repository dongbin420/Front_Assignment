import * as S from './DragAndDrop.styles';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from './DroppableWrapper/DroppableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DragAndDrop() {
  const { dndData, onDragUpdate, onDragEnd, resetBoard } = useDndContext();

  return (
    <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <S.DragAndDropTitle>Drag and Drop</S.DragAndDropTitle>
      <S.ResetButton onClick={resetBoard}>Reset</S.ResetButton>
      <S.DragAndDropContainer>
        {dndData.columnOrder.map((columnId) => {
          const columnData = dndData.columns[columnId];
          const itemsData = columnData.itemIds.map((itemId) => dndData.items[itemId]);

          return (
            <DroppableWrapper key={columnData.id} columnData={columnData} itemsData={itemsData} />
          );
        })}
      </S.DragAndDropContainer>
    </DragDropContext>
  );
}

export default DragAndDrop;
