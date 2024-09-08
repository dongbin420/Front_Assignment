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

export const ToolTipTextContainer = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  background-color: #555;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* 아이콘 위에 표시 */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  gap: 6px;
  visibility: hidden;

  @media (max-width: 650px) {
    width: 450px;
    transform: translateX(-70%);
  }

  @media (max-width: 520px) {
    bottom: -510%;
    width: 350px;
  }

  @media (max-width: 400px) {
    bottom: -650%;
    width: 250px;
    transform: translateX(-80%);
  }
`;

export const ToolTipText = styled.div`
  font-size: 14px;
  color: #fff;
`;

export const ToolTip = styled.div`
  position: relative;
  cursor: pointer;

  &:hover ${ToolTipTextContainer}, &:focus ${ToolTipTextContainer} {
    visibility: visible;
    opacity: 1;
  }
`;

export const InfoIcon = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 3px solid black;
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  line-height: 19px;
  font-weight: 1000;
  color: black;
`;
