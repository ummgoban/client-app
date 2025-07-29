import styled from '@emotion/native';

const S = {
  ModalOverlay: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  `,
  ModalContent: styled.View`
    width: 55%;
    max-height: 70%;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    align-items: center;
  `,
  ModalHeader: styled.View`
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  `,
  ModalHeaderText: styled.Text`
    ${props => props.theme.fonts.h6};
  `,
  CloseButton: styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
  `,
  HourList: styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  `,
  HourItem: styled.View`
    padding-vertical: 8px;
  `,
  HourText: styled.Text`
    ${props => props.theme.fonts.subtitle1};
    color: #212529;
  `,
};

export default S;
