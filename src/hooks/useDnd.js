import { useDndState } from './useDndState';
import { useItemSelection } from './useItemSelection';
import { useDragHandlers } from './useDragHandlers';

export const useDnd = (initialItems, initialColumns) => {
  const {
    dndData,
    selectedItems,
    invalidLayout,
    invalidCol,
    setDndData,
    setSelectedItems,
    setInvalidLayout,
    setInvalidCol,
    resetBoard,
  } = useDndState(initialItems, initialColumns);

  const { handleSelectItem } = useItemSelection(selectedItems, setSelectedItems);
  const { onDragUpdate, onDragEnd } = useDragHandlers(
    dndData,
    selectedItems,
    setDndData,
    setInvalidLayout,
    setInvalidCol,
    setSelectedItems,
  );

  return {
    dndData,
    invalidLayout,
    selectedItems,
    handleSelectItem,
    onDragUpdate,
    onDragEnd,
    resetBoard,
    invalidCol,
  };
};
