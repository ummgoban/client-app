import styled from '@emotion/native';

const S = {
  Layout: styled.View<{
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }>`
    flex: 1;
    padding: ${({top, left, right, bottom}) =>
      `${top ?? 0}px ${right ?? 0}px ${bottom ?? 0}px ${left ?? 0}px`};
  `,
};

export default S;
