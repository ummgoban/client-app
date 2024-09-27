import styled from '@emotion/native';

const MarketDetailInfoView = styled.View`
  flex: 1;
  padding: 16px;
`;
const MarketMainInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
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
  color: #2d3e39;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;
const MarketTimeDescription = styled.Text`
  color: red;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

const MarketSideInfoWrapper = styled.View`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const MarketSideInfo = styled.Text`
  color: #78827f;

  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
`;

const SideTagBarScrollView = styled.ScrollView`
  padding-bottom: 50px;
`;

const SideBarView = styled.View<{selected: boolean}>`
  width: 100px;
  height: 35px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: ${({selected}) =>
    selected ? 'skyblue' : 'rgb(154, 211, 232)'};
  margin: 5px;
  border-radius: 10px;
`;
const SideBarText = styled.Text<{selected: boolean}>`
  color: ${({selected}) => (selected ? 'black' : 'white')};
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

const S = {
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
