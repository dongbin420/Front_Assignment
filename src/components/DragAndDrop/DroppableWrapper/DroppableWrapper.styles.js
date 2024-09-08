import styled, { keyframes, css } from 'styled-components';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  flex: 1 1 43%;

  ${(props) =>
    props.$isDropImpossible &&
    css`
      animation: ${shake} 0.5s;
    `};
`;

export const ColumnTitle = styled.div`
  padding: 16px;

  background-color: #f9fafc;
  font-size: 20px;
  font-weight: 600;
  border-radius: 8px 8px 0 0;

  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

export const Column = styled.div`
  background-color: ${(props) =>
    props.$isInvalidDrop ? '#f9fafc' : props.$isDraggingOver ? '#e3f4fb' : '#f9fafc'};
  padding: 12px;
  flex-grow: 1;
  min-height: 600px;
  border-radius: 0 0 8px 8px;

  @media (max-width: 650px) {
    min-height: 500px;
  }

  @media (max-width: 520px) {
    min-height: 350px;
  }
`;
