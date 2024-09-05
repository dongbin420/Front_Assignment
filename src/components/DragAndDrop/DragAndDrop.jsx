import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from './DroppableWrapper/DroppableWrapper';
import { useDndContext } from '@/hooks/useDndContext';

function DragAndDrop() {
  const { onDragEnd } = useDndContext();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableWrapper />
    </DragDropContext>
  );
}

export default DragAndDrop;

// import { useState, useCallback } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { getItems, reorder, getListStyle, getItemStyle } from '@/utils/dndUtils';

// function DragAndDrop() {
//   const [items, setItems] = useState(getItems(10));

//   const onDragEnd = useCallback(
//     (result) => {
//       if (!result.destination) {
//         return;
//       }

//       const newItems = reorder(items, result.source.index, result.destination.index);

//       setItems(newItems);
//     },
//     [items],
//   );

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided, snapshot) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default DragAndDrop;
