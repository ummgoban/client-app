import styled from '@emotion/native';

const MarketImageScrollView = styled.ScrollView`
  height: 150px;
`;
const MarketImageContainer = styled.View<{screenWidth: number}>`
  width: ${({screenWidth}) => `${screenWidth}px`};
  height: 200px;
`;

const MarketImage = styled.Image<{screenWidth: number}>`
  width: ${({screenWidth}) => `${screenWidth}px`};
  height: 100%;
  background-color: white;
  resize-mode: cover;
`;

const IndexView = styled.View`
  position: absolute;
  top: 10px;
  left: 10px;
  backgroundcolor: rgba(0, 0, 0, 0.5);
  paddinghorizontal: 8px;
  paddingvertical: 4px;
  borderradius: 5px;
`;

const IndexText = styled.Text`
  color: white;
  fontsize: 14px;
  fontweight: bold;
`;
const S = {
  MarketImageScrollView,
  MarketImageContainer,
  MarketImage,
  IndexView,
  IndexText,
};

export default S;
