import styled from '@emotion/native';

const S = {
  Container: styled.View`
    position: relative;

    flex: 1;

    background-color: white;
  `,

  SearchWrapper: styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  `,

  MarketWrapper: styled.View``,

  LastIndicatorItem: styled.View`
    padding: 16px;

    justify-content: center;
    align-items: center;
  `,
};

export default S;
