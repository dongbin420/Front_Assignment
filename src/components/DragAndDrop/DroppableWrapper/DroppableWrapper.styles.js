import styled from 'styled-components';

export const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.div`
  padding: 8px;
`;

export const Column = styled.div`
  background-color: ${(props) => (props.$isDraggingOver ? 'lightblue' : 'lightgrey')};
  padding: 8px;
  flex-grow: 1;
  min-height: 700px;
`;
