import styled from '@emotion/native';

const MarketDetailInfoView = styled.View`
  flex: 1;
`;
const MarketInfoWrapper = styled.View`
  display: flex;
  background-color: #fff;
  margin-bottom: 16px;
  padding: 16px;
`;
const MarketMainInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  align-self: stretch;
`;
const SpecialView = styled.View``;
const MarKetName = styled.Text`
  color: #2d3e39;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;
const MarketDescription = styled.Text`
  ${props => props.theme.fonts.subtitle1};
  font-family: Pretendard;
  font-weight: bold;
  color: black;
`;
const MarketPickupTimeWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const MarketPickupTime = styled.Text`
  ${props => props.theme.fonts.titleMedium};
  color: black;
  font-family: Pretendard;
  font-weight: bold;
`;
const MarketTimeDescription = styled.Text`
  ${props => props.theme.fonts.titleMedium};

  color: #f05650;
  font-family: Pretendard;
  font-weight: 500;
`;

const MarketSideInfoWrapper = styled.View`
  display: flex;
  padding: 8px 0px;
  gap: 4px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const MarketSideInfo = styled.Text`
  ${props => props.theme.fonts.titleMedium};
  color: black;
  font-family: Pretendard;
  font-weight: 600;
`;
const MarketSubscribeIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;
const SideTagBarScrollView = styled.ScrollView`
  flex-grow: 0;
  padding-bottom: 20px;
`;

const SideBarView = styled.View<{selected: boolean}>`
  width: 100px;
  height: 35px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.primary : 'white'};
  border: ${({selected, theme}) =>
    selected ? '' : `1px solid ${theme.colors.primary}`};
  margin: 5px;
  border-radius: 10px;
`;
const SideBarText = styled.Text<{selected: boolean}>`
  color: ${({selected}) => (selected ? 'white' : 'black')};
  font-size: 14px;
  font-weight: bold;
  text-align-vertical: center;
`;
const Divider = styled.View`
  width: 390px;
  height: 8px;
  background: #ecf3f1;
`;

const MenuScrollView = styled.ScrollView``;
const MenuView = styled.View``;

const MenuText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 15px;
`;
const ReserveButton = styled.TouchableOpacity`
  margin-top: 15px;
  display: flex;
  align-items: center;
  background-color: lightblue;
  height: 40px;
  text-align: center;
`;

const ButtonText = styled.Text`
  padding-top: 7px;
  font-size: 20px;
  font-weight: 200;
  color: blue;
`;

const TagWrapper = styled.View`
  display: flex;
  padding-left: 16px;
`;
const S = {
  TagWrapper,
  MarketPickupTime,
  MarketPickupTimeWrapper,
  MarketSubscribeIconWrapper,
  MarketInfoWrapper,
  SpecialView,
  MarketDetailInfoView,
  MarketMainInfoWrapper,
  MarKetName,
  MarketDescription,
  MarketTimeDescription,
  MarketSideInfo,
  MarketSideInfoWrapper,
  SideTagBarScrollView,
  SideBarView,
  SideBarText,
  Divider,
  MenuScrollView,
  MenuView,
  MenuText,
  ReserveButton,
  ButtonText,
};

export default S;
