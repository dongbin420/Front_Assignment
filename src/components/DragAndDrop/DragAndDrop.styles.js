import styled from 'styled-components';

export const DragAndDropContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 520px) {
    flex-wrap: wrap;
  }
`;

export const DragAndDropTitle = styled.div`
  font-size: 64px;
  font-weight: 700;
  padding: 25px;
  padding-bottom: 25px;
  text-align: center;
  color: white;

  @media (max-width: 650px) {
    font-size: 64px;
  }

  @media (max-width: 520px) {
    font-size: 48px;
  }

  @media (max-width: 400px) {
    font-size: 36px;
  }
`;

export const ButtonToolTipContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const ResetButton = styled.button`
  margin-right: 20px;
  margin-left: 50px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(145deg, #333333, #000000);
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
    background: linear-gradient(145deg, #444444, #222222);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    background: linear-gradient(145deg, #555555, #333333);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
