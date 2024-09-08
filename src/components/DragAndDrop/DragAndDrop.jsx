import * as S from './DragAndDrop.styles';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from './DroppableWrapper/DroppableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DragAndDrop() {
  const { dndData, onDragUpdate, onDragEnd, resetBoard } = useDndContext();

  return (
    <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <S.DragAndDropTitle>Drag and Drop</S.DragAndDropTitle>
      <S.ButtonToolTipContainer>
        <S.ResetButton onClick={resetBoard}>Reset</S.ResetButton>
        <S.ToolTip>
          <S.InfoIcon>?</S.InfoIcon>
          <S.ToolTipTextContainer>
            <S.ToolTipText>
              규칙 1: 첫 번째 컬럼에서 세 번째 컬럼으로 이동할 수 없습니다.
            </S.ToolTipText>
            <S.ToolTipText>
              규칙 2: 짝수 아이템은 다른 짝수 아이템 바로 앞으로 이동할 수 없습니다.
            </S.ToolTipText>
            <S.ToolTipText>규칙 3: Ctrl+클릭으로 선택/해제가 가능합니다.</S.ToolTipText>
          </S.ToolTipTextContainer>
        </S.ToolTip>
      </S.ButtonToolTipContainer>
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
