import styled from 'styled-components';

export const Item = styled.div`
  user-select: 'none';
  font-size: 16px;
  font-weight: 700;
  padding: 24px;
  padding-left: 20px;
  margin: 0 0 10px 0;
  border-radius: 8px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  border: ${(props) =>
    props.$isInvalidItem
      ? '3px solid #c60000'
      : props.$isSelected && props.$isDragging
        ? '3px solid #04169e'
        : props.$isDragging
          ? '3px solid #418df3'
          : '2px solid #d6d9df'};
  background-color: ${(props) =>
    props.$isInvalidItem
      ? 'red'
      : props.$isSelected
        ? '#0F5EB8'
        : props.$isDragging
          ? '#dce7fa'
          : 'white'};

  @media (max-width: 650px) {
    font-size: 12px;
    padding: 12px;
    padding-left: 10px;
  }
`;
