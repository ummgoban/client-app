import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
`;

const SearchWrapper = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const MarketWrapper = styled.View`
  // margin-top: 50px;
`;

const LastIndicatorItem = styled.View`
  padding: 16px;

  justify-content: center;
  align-items: center;
`;

const S = {
  Container,
  SearchWrapper,
  MarketWrapper,
  LastIndicatorItem,
};

export default S;
