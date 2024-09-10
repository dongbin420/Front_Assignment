import { useCallback } from 'react';

export const useItemSelection = (selectedItems, setSelectedItems) => {
  const handleSelectItem = useCallback(
    (itemId, columnId, event) => {
      if (event.ctrlKey) {
        setSelectedItems((prevSelected) => {
          if (selectedItems.some((item) => item.id === itemId)) {
            return prevSelected.filter((item) => item.id !== itemId);
          }

          if (selectedItems.length === 0 || selectedItems[0].columnId === columnId) {
            return [...prevSelected, { id: itemId, columnId }];
          }

          return prevSelected;
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedItems],
  );

  return {
    handleSelectItem,
  };
};
