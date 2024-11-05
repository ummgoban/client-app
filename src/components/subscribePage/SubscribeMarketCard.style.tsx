import styled from '@emotion/native';

const SubscribeMarketCard = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  height: 120px;
  align-items: center;
`;

const MarketInfo = styled.View`
  display: flex;
  gap: 4px;
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
`;

const thumbnailImage = styled.Image`
  width: 64px;
  height: 84px;
  border-radius: 12px;
  margin: 0px 16px;
`;

const S = {
  SubscribeMarketCard,
  MarketInfo,
  MarketNameText,
  MarketDescribeText,
  thumbnailImage,
};

export default S;
