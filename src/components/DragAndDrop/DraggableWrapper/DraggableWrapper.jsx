import * as S from './DraggableWrapper.styles';
import { Draggable } from 'react-beautiful-dnd';
import { useDndContext } from '@/hooks/useDndContext';

function DraggableWrapper({ itemData, idx, columnId }) {
  const { invalidLayout, selectedItems, handleSelectItem } = useDndContext();
  const isSelected = selectedItems.some((item) => item.id === itemData.id);
  const isInvalidItem = invalidLayout.draggableId === itemData.id;
  const isInvalidItemSelected = selectedItems.some((item) => item.id === invalidLayout.draggableId);

  return (
    <Draggable draggableId={itemData.id} index={idx}>
      {(provided, snapshot) => (
        <S.Item
          onClick={(e) => handleSelectItem(itemData.id, columnId, e)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $isSelected={isSelected}
          $isInvalidItem={isInvalidItem || (isSelected && isInvalidItemSelected)}
        >
          {itemData.content}
        </S.Item>
      )}
    </Draggable>
  );
}

export default DraggableWrapper;
