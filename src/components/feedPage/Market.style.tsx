import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '@/context/theme';

const MarketTitle = styled.Text`
  font: ${theme.fonts.h6};
  font-weight: 800;
  padding-left: 10px;
  margin-bottom: 4px;
`;

const MarketPickupTime = styled.Text`
  font: ${theme.fonts.body2};
  padding-left: 10px;
`;

const MarketAddress = styled.Text`
  font: ${theme.fonts.body2};
  padding-left: 10px;
`;

const MenuLabel = styled.Text`
  position: absolute;
  top: 5px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font: ${theme.fonts.caption};
  z-index: 110;
`;

const PriceLabel = styled.Text`
  position: absolute;
  font: ${theme.fonts.body2};
  top: 20px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: 600;
  z-index: 101;
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
  gap: 8px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 160px;
  flex-direction: row;
  padding: 16px;
`;

const MenuGradation = styled(LinearGradient)`
  flex: 1;
  z-index: 100;
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
  gap: 8px;
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
