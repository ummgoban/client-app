import styled from '@emotion/native';

import {Platform} from 'react-native';

const S = {
  FloatingButtonContainer: styled.View`
    position: absolute;
    bottom: 18px;
    right: 16px;
  `,

  FloatingButton: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    padding: 0 12px;

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

  IconWrapper: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    padding: 10px 0;
  `,

  FloatingButtonText: styled.Text`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 2px;

    color: ${props => props.theme.colors.dark};
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;

    letter-spacing: 0.12px;
  `,
};

export default S;
