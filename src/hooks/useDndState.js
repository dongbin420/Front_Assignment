import { useState, useCallback } from 'react';
import { getDndData } from '@/utils/dndUtils';

export const useDndState = (initialItems, initialColumns) => {
  const initialDnd = getDndData(initialItems, initialColumns);
  const [dndData, setDndData] = useState(getDndData(initialItems, initialColumns));
  const [selectedItems, setSelectedItems] = useState([]);
  const [invalidLayout, setInvalidLayout] = useState({});
  const [invalidCol, setInvalidCol] = useState(null);

  const resetBoard = useCallback(() => {
    setDndData(initialDnd);
    setSelectedItems([]);
  }, [initialDnd]);

  return {
    dndData,
    selectedItems,
    invalidLayout,
    invalidCol,
    setDndData,
    setSelectedItems,
    setInvalidLayout,
    setInvalidCol,
    resetBoard,
  };
};
