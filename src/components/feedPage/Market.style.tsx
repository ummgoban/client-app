import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

const MarketPickupTime = styled.Text`
  ${props => props.theme.fonts.body2};
  padding-left: 10px;
`;

const MarketAddress = styled.Text`
  ${props => props.theme.fonts.body2};
  font-weight: 700;
  padding-left: 10px;
`;

const MenuLabel = styled.Text`
  ${props => props.theme.fonts.caption};
  position: absolute;
  width: 100%;
  top: 5px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 10;
`;

const PriceLabel = styled.Text`
  ${props => props.theme.fonts.body2};
  font-weight: 700;
  position: absolute;
  top: 20px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 10;
`;

const MarketWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
  padding-bottom: 16px;
`;

const MarketImageContainer = styled.View`
  display: flex;
  width: 100%;
  height: 140px;
  gap: 8px;
  flex-direction: row;
  padding: 8px;
`;

const MenuGradation = styled(LinearGradient)`
  z-index: 5;
  height: 100%;
  width: 100%;
  border-radius: 18px;
  position: absolute;
`;

const MarketImageBox = styled.View`
  display: flex;
  flex: 1;
`;

const MarketImage = styled.Image`
  z-index: 1;
  border-radius: 18px;
  width: 100%;
  height: 100%;
`;

const MarketInfoDiscription = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MarketTitle = styled.Text`
  ${props => props.theme.fonts.h6};
  font-weight: 800;
  padding-left: 10px;
  margin-bottom: 4px;
`;

const S = {
  MarketWrapper,
  MarketImageContainer,
  MarketImageBox,
  MarketImage,
  PriceLabel,
  MenuLabel,
  MarketTitle,
  MarketPickupTime,
  MenuGradation,
  MarketAddress,
  MarketInfoDiscription,
};

export default S;
