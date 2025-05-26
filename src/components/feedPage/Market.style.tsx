import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

const S = {
  MarketWrapper: styled.Pressable`
    display: flex;
    padding: 12px 0px 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  `,

  MarketImageBox: styled.View`
    max-width: 140px;
    margin-right: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  `,

  MarketImage: styled.Image`
    width: 140px;
    height: 140px;
    border-radius: 12px;
    position: relative;
    z-index: 1;
  `,

  MenuGradation: styled(LinearGradient)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    z-index: 2;
  `,

  LableWrapper: styled.View`
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px;
    width: 100%;
    z-index: 3;
  `,

  MenuLabel: styled.Text`
    color: #fff;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.12px;
  `,

  PriceLabel: styled.Text`
    color: #fff;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.13px;
  `,

  MarketInfoDiscription: styled.View`
    display: flex;
    flex-direction: column;
  `,

  MarketTitle: styled.Text`
    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 4px;
  `,

  MarketPickupTime: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,

  LightText: styled.Text`
    color: #8d96a9;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  `,

  DarkText: styled.Text`
    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  `,

  DescriptionContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
};

export default S;
