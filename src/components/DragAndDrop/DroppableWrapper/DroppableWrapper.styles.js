import styled from 'styled-components';

export const List = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? 'lightblue' : 'lightgrey')};
  padding: 8px; // GRID
  width: 250px;
`;
