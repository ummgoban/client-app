import styled from '@emotion/native';

const MarketDetailInfoView = styled.View`
  flex: 1;
  padding: 16px;
`;
const ReserveButton = styled.TouchableOpacity`
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
  ReserveButton,
  ButtonText,
};

export default S;
