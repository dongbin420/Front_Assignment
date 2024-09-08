import * as S from './ToolTip.styles';

function ToolTip() {
  return (
    <S.ToolTip>
      <S.InfoIcon>?</S.InfoIcon>
      <S.ToolTipTextContainer>
        <S.ToolTipText>규칙 1: 첫 번째 컬럼에서 세 번째 컬럼으로 이동할 수 없습니다.</S.ToolTipText>
        <S.ToolTipText>
          규칙 2: 짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.
        </S.ToolTipText>
        <S.ToolTipText>
          규칙 3: Ctrl+클릭으로 같은 컬럼 내 아이템 선택/해제 후 멀티 드래그를 할 수 있습니다.
        </S.ToolTipText>
      </S.ToolTipTextContainer>
    </S.ToolTip>
  );
}

export default ToolTip;
