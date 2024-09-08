import * as S from './DraggableWrapper.styles';
import { Draggable } from 'react-beautiful-dnd';
import { useDndContext } from '@/hooks/useDndContext';

function DraggableWrapper({ itemData, idx, columnId }) {
  const { invalidItem, selectedItems, handleSelectItem } = useDndContext();
  const isSelected = selectedItems.some((item) => item.id === itemData.id);

  return (
    <Draggable draggableId={itemData.id} index={idx}>
      {(provided, snapshot) => (
        <S.Item
          onClick={(e) => handleSelectItem(itemData.id, columnId, e)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging} // styled-components props가 dom으로 전달되지 않음
          $isInvalidItem={invalidItem === itemData.id || (invalidItem && isSelected)}
          $isSelected={isSelected}
        >
          {itemData.content}
        </S.Item>
      )}
    </Draggable>
  );
}

export default DraggableWrapper;
