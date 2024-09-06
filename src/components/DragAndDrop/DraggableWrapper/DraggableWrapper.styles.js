import styled from 'styled-components';

export const Item = styled.div`
  user-select: 'none'; // 해당 요소의 텍스트 선택 못함(드래그 등)
  padding: 16px; // GRID * 2
  margin: 0 0 8px 0; // GRID
  background-color: ${(props) =>
    props.$isDraggingOverThird ? 'red' : props.$isDragging ? 'lightgreen' : 'grey'};
`;
