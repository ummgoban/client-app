import styled from '@emotion/native';
import {Platform} from 'react-native';

// TODO: 각 씬의 margin horizontal을 24px로 설정
// programmatic하게 margin을 주기

const S = {
  OrderContainer: styled.View`
    display: flex;

    padding: 20px 0;
  `,

  Title: styled.Text`
    font-size: 20px;
    line-height: 30px;
    font-weight: 600;

    margin: 0 24px 12px;
  `,

  HistoryList: styled.View`
    display: flex;
    gap: 12px;
  `,

  HistoryItem: styled.View`
    display: flex;
    gap: 24px;

    padding: 20px 24px;
    background-color: #ffffff;

    box-shadow: 0px 4px;
    box-shadow-color: rgba(0, 0, 0, 0.08);

    ${Platform.OS === 'ios'
      ? `shadow-radius: 4px;
      shadow-offset: 0px 4px;
      shadow-opacity: 0.08;`
      : Platform.OS === 'android'
        ? 'elevation: 11;'
        : ''}
  `,

  HistoryItemSkeleton: styled.View`
    display: flex;
    gap: 24px;

    padding: 20px 24px;
    background-color: #ffffff;

    box-shadow: 0px 4px;
    box-shadow-color: rgba(0, 0, 0, 0.08);

    min-height: 200px;
  `,

  HistoryItemSummary: styled.View`
    display: flex;
    flex-direction: row;
    gap: 12px;
  `,

  ItemInfo: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;
  `,

  StoreImage: styled.Image`
    width: 64px;
    height: 64px;

    border-radius: 32px;
  `,

  InfoHeader: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,

  TouchableStoreName: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 4px;

    max-width: 60%;
  `,

  StoreName: styled.Text`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
  `,

  OrderDetailButtonContainer: styled.View`
    width: auto;
    height: 26px;

    border-radius: 15px;
    border: 1px solid #ebebeb;
  `,

  OrderDetailButton: styled.TouchableOpacity``,

  OrderDetailButtonText: styled.Text`
    padding: 2px 10px;
    color: #222222;

    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.408px;
  `,

  ReviewCreateButtonContainer: styled.View`
    width: auto;
    height: 26px;

    border-radius: 15px;
    border: 1px solid #ebebeb;
  `,

  ReviewCreateButton: styled.TouchableOpacity``,

  ReviewCreateButtonText: styled.Text`
    padding: 2px 10px;
    color: #222222;

    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.408px;
  `,
  CreatedAt: styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    color: #b5b5b5;
  `,

  Description: styled.Text`
    font-size: 14px;
    line-height: 20px;

    word-wrap: break-word;
    word-break: keep-all;
  `,

  HistoryTimelineContainer: styled.View`
    display: flex;
    flex-direction: column;
  `,
};

export default S;
