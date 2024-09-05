import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '@/utils/dndUtils';

function DraggableWrapper({ draggableId, index, item }) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableWrapper;
