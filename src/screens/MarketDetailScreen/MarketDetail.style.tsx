import styled from '@emotion/native';

const MarketDetailInfoView = styled.View`
  flex: 1;
  padding: 16px;
`;
const MarketMainInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const MarKetName = styled.Text`
  color: #2d3e39;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 28.5px;
`;
const MarketDescription = styled.Text`
  color: #2d3e39;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.12px;
`;

const MarketSideInfoWrapper = styled.View`
  display: flex;
  padding: 16px 0px;
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
  line-height: normal;
`;

const Divider = styled.View`
  width: 390px;
  height: 8px;
  background: #ecf3f1;
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
  padding-top: 10px;
  font-size: 20px;
  font-weight: 200;
  color: blue;
`;

const S = {
  MarketDetailInfoView,
  MarketMainInfoWrapper,
  MarKetName,
  MarketDescription,
  MarketSideInfo,
  MarketSideInfoWrapper,
  Divider,
  ReserveButton,
  ButtonText,
};

export default S;
