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

const MarketWrapper = styled.ScrollView`
  margin-top: 50;
`;

const S = {
  Container,
  SearchWrapper,
  MarketWrapper,
};

export default S;
