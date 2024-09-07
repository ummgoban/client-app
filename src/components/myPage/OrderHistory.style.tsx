import styled from '@emotion/native';
import {Platform} from 'react-native';

// TODO: 각 씬의 margin horizontal을 24px로 설정
// programmatic하게 margin을 주기

const OrderContainer = styled.View`
  display: flex;

  padding: 20px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;

  margin: 0 24px 12px;
`;

const HistoryList = styled.View`
  display: flex;
  gap: 12px;
`;

const HistoryItem = styled.View`
  display: flex;
  gap: 24px;

  padding: 20px 24px;
  background-color: #ffffff;

  box-shadow: 0px 4px;
  box-shadow-color: rgba(0, 0, 0, 0.08);

  ${Platform.OS === 'ios'
    ? `  shadow-radius: 4px;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
    `
    : Platform.OS === 'android'
    ? `
    elevation: 11;

    `
    : ''}
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
  line-height: 26px;
  font-weight: 600;
`;

const OrderDetailButtonContainer = styled.View`
  width: auto;
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
  line-height: 20px;

  color: #b5b5b5;
`;

const Description = styled.Text`
  font-size: 14px;
  line-height: 20px;
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
