import styled from '@emotion/native';

const S = {
  MarketDetailInfoView: styled.View`
    flex: 1;
  `,
  MarketInfoWrapper: styled.View`
    display: flex;
    background-color: #fff;

    padding: 16px;
  `,
  MarketMainInfoWrapper: styled.View`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    align-items: center;
    align-self: stretch;
  `,
  SpecialView: styled.View``,
  MarKetName: styled.Text`
    color: #2d3e39;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  `,
  MarketDescription: styled.Text`
    ${props => props.theme.fonts.subtitle1};
    font-family: Pretendard;
    font-weight: bold;
    color: black;
  `,
  MarketPickupTimeWrapper: styled.View`
    display: flex;
    flex-direction: row;
  `,

  MarketPickupTime: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: bold;
  `,
  MarketTimeDescription: styled.Text`
    ${props => props.theme.fonts.titleMedium};

    color: #f05650;
    font-family: Pretendard;
    font-weight: 500;
  `,

  MarketSideInfoWrapper: styled.View`
    display: flex;
    padding: 8px 0px;
    gap: 4px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  `,

  MarketSideInfo: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
  `,

  MarketBottomInfo: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,

  SideTagBarScrollView: styled.ScrollView`
    padding: 8px 0;
    height: 104px;
  `,

  SideBarView: styled.View<{selected: boolean}>`
    width: 100px;
    height: 36px;
    justify-content: center;
    align-items: center;
    padding: 4px;
    background-color: ${({selected, theme}) =>
      selected ? theme.colors.primary : 'white'};
    border: ${({selected, theme}) =>
      selected ? '' : `1px solid ${theme.colors.primary}`};
    margin: 5px;
    border-radius: 10px;
  `,
  SideBarText: styled.Text<{selected: boolean}>`
    color: ${({selected}) => (selected ? 'white' : 'black')};
    font-size: 14px;
    font-weight: bold;
    text-align-vertical: center;
  `,
  Divider: styled.View`
    width: 390px;
    height: 8px;
    background: #ecf3f1;
  `,

  MenuScrollView: styled.ScrollView``,
  MenuView: styled.View``,

  MenuText: styled.Text`
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 15px;
  `,
  ReserveButton: styled.TouchableOpacity`
    margin-top: 15px;
    display: flex;
    align-items: center;
    background-color: lightblue;
    height: 40px;
    text-align: center;
  `,

  ButtonText: styled.Text`
    padding-top: 7px;
    font-size: 20px;
    font-weight: 200;
    color: blue;
  `,

  TagWrapper: styled.View`
    display: flex;
    padding-left: 16px;
  `,

  ReviewInfoWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  ReviewTouchableOpacity: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  ReviewScoreText: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
  `,

  ReviewCountText: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
    padding-left: 2px;
    margin-right: -14px;
  `,
};

export default S;
