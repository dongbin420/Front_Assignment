import styled from 'styled-components';

export const DragAndDropContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-evenly;
`;

export const DragAndDropTitle = styled.div`
  font-size: 64px;
  font-weight: 600;
  padding: 35px;
  padding-bottom: 25px;
  text-align: center;
`;

export const ResetButton = styled.button`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(145deg, #ffd700, #ffc300);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #ffc300, #ffb700);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    background: linear-gradient(145deg, #ffb700, #ffa700);
    box-shadow: 0 0 0 4px rgba(255, 195, 0, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
