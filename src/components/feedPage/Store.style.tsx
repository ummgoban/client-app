import styled from '@emotion/native';

const StoreWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
`;
const StoreImageContainer = styled.View`
flex-direction: row;
justify-content : space-between
padding: 10px`;

const StoreImageBox = styled.View`
  position: relative;
  flex: 1;
`;

const StoreImage = styled.Image`
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

const StoreTitle = styled.Text`
font-size: 18px;
font-weight:800
padding: 0px 10px 5px 10px;
`;

const StorePickupTime = styled.Text`
  font-size: 12px;
  font-weight: 400;
  padding-left: 10px;
`;

const S = {
  StoreWrapper,
  StoreImageContainer,
  StoreImageBox,
  StoreImage,
  PriceLabel,
  StoreTitle,
  StorePickupTime,
};

export default S;
