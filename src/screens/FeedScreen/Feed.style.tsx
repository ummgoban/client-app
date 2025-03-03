import styled from '@emotion/native';
import {Platform} from 'react-native';

const S = {
  Container: styled.View`
    position: relative;

    flex: 1;
  `,

  SearchWrapper: styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  `,

  MarketWrapper: styled.View``,

  LastIndicatorItem: styled.View`
    padding: 16px;

    justify-content: center;
    align-items: center;
  `,

  FloatingButtonContainer: styled.View`
    position: absolute;
    bottom: 18px;
    right: 16px;
  `,

  FloatingButton: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: center;

    padding: 10px 12px;

    border-radius: 999px;
    background-color: white;

    color: ${props => props.theme.colors.dark};

    shadow-color: rgba(0, 0, 0, 0.32);

    ${Platform.OS === 'ios'
      ? `
      shadow-offset: 1px 16px;
      shadow-opacity: 0.32;
      shadow-radius: 2px;
      `
      : Platform.OS === 'android'
        ? `
      elevation: 2;
      `
        : ``}
  `,

  FloatingButtonText: styled.Text`
    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
    letter-spacing: 0.12px;
  `,
};

export default S;
