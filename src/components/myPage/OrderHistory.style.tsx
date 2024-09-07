import styled from '@emotion/native';

const OrderContainer = styled.View`
  display: flex;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  line-height: 28.5px;
  font-weight: 600;

  margin-bottom: 12px;
`;

const HistoryList = styled.View`
  display: flex;
  gap: 12px;
`;

const HistoryItem = styled.View`
  display: flex;
  gap: 24px;
`;

const HistoryItemSummary = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ItemInfo = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;

  flex: 1;
`;

const StoreImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const InfoHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StoreName = styled.Text`
  font-size: 20px;
  line-height: 130%;
  font-weight: 600;
`;

const OrderDetailButtonContainer = styled.View`
  width: max-content;
  height: 26px;

  box-sizing: border-box;

  border-radius: 15px;
  border: 1px solid #ebebeb;
`;

const OrderDetailButton = styled.TouchableOpacity``;

const OrderDetailButtonText = styled.Text`
  padding: 2px 10px;
  color: #222222;

  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

const CreatedAt = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;

  color: #b5b5b5;
`;

const Description = styled.Text`
  font-size: 14px;
  line-height: 130%;
`;

const HistoryTimelineContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const S = {
  OrderContainer,
  Title,
  HistoryList,
  HistoryItem,
  HistoryItemSummary,
  ItemInfo,
  StoreImage,
  InfoHeader,
  StoreName,
  OrderDetailButtonContainer,
  OrderDetailButton,
  OrderDetailButtonText,
  CreatedAt,
  Description,
  HistoryTimelineContainer,
};

export default S;
