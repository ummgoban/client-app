import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

const S = {
  MarketPickupTime: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,

  LableWrapper: styled.View`
    position: absolute;
    width: 100%;

    z-index: 10;

    display: flex;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  `,
  MenuLabel: styled.Text`
    color: #fff;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
    letter-spacing: -0.12px;
  `,

  PriceLabel: styled.Text`
    color: #fff;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 138.462% */
    letter-spacing: -0.13px;
  `,

  MarketWrapper: styled.TouchableOpacity`
    display: flex;
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  `,

  MarketImageContainer: styled.View`
    display: flex;
    width: 100%;
    height: 140px;
    gap: 8px;
    flex-direction: row;
  `,

  MenuGradation: styled(LinearGradient)`
    z-index: 5;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    position: absolute;
  `,

  MarketImageBox: styled.View`
    display: flex;
    flex: 1;

    max-width: 140px;
  `,

  MarketImage: styled.Image`
    z-index: 1;
    border-radius: 12px;

    width: 140px;
    height: 140px;
  `,

  MarketInfoDiscription: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  MarketTitle: styled.Text`
    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */

    margin-bottom: 4px;
  `,

  LightText: styled.Text`
    color: #8d96a9;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
  `,

  DarkText: styled.Text`
    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
  `,

  DescriptionContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
};

export default S;
