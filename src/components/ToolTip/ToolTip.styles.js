import styled from 'styled-components';

export const ToolTipTextContainer = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  background-color: #555;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  gap: 6px;
  visibility: hidden;

  @media (max-width: 750px) {
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
