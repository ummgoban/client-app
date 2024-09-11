import styled from '@emotion/native';

const MarketWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
`;
const MarketImageContainer = styled.View`
flex-direction: row;
justify-content : space-between
padding: 10px
`;

const MarketImageBox = styled.View`
  position: relative;
  flex: 1;
`;

const MarketImage = styled.Image`
  flex: 1;
  aspect-ratio: 1;
  margin-right: 10px;
  border-radius: 18px;
  opacity: 0.8;
`;

const PriceLabel = styled.Text`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

const MarketTitle = styled.Text`
font-size: 18px;
font-weight:800
padding: 0px 10px 5px 10px;
`;

const MarketPickupTime = styled.Text`
  font-size: 12px;
  font-weight: 400;
  padding-left: 10px;
`;

const S = {
  MarketWrapper,
  MarketImageContainer,
  MarketImageBox,
  MarketImage,
  PriceLabel,
  MarketTitle,
  MarketPickupTime,
};

export default S;
