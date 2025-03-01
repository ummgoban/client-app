import styled from '@emotion/native';

const SubscribeMarketCard = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: white;

  border-radius: 8px;
  margin-bottom: 16px;

  width: 100%;
  height: 120px;
  padding: 16px 12px;
`;

const MarketInfo = styled.View`
  display: flex;
  gap: 4px;

  flex: 1;
`;

const MarketNameText = styled.Text`
  font-family: pretendard;
  font-weight: bold;
  font-size: 16px;
`;

const MarketDescribeText = styled.Text`
  font-family: pretendard;
  font-size: 14px;
  font-weight: 400;

  word-break: break-all;
  word-wrap: keep-all;
`;

const ThumbnailImage = styled.View`
  width: 64px;
  height: 64px;

  border-radius: 12px;
  border: 1px solid #e0e0e0;
  margin: 0px 16px;
`;

const S = {
  SubscribeMarketCard,
  MarketInfo,
  MarketNameText,
  MarketDescribeText,
  ThumbnailImage,
};

export default S;
