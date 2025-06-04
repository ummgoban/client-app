import styled from '@emotion/native';

const S = {
  ReviewCreateScreenContainer: styled.View`
    flex: 1;
    background-color: white;
    padding: 16px 16px;
  `,
  ReviewRequestTextContainer: styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  `,
  ReviewRequsetText: styled.Text`
    ${({theme}) => theme.fonts.subtitle1};
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  `,
  ContentInformationText: styled.Text`
    ${({theme}) => theme.fonts.body1};
    color: ${props => props.theme.colors.tertiary};
    font-weight: 700;
  `,

  MarketName: styled.Text`
    ${({theme}) => theme.fonts.h5};
    color: ${props => props.theme.colors.tertiary};
    font-weight: 700;
  `,

  ReviewContentContainer: styled.View`
    display: flex;
    margin: 16px 0px;
    gap: 12px;
  `,
  TextRowWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  ContentDescription: styled.Text`
    ${({theme}) => theme.fonts.body1};
    color: ${props => props.theme.colors.tertiary};
  `,

  ReviewInputContainer: styled.View`
    display: flex;
    gap: 16px;
    height: 256px;
  `,

  LoadingOverlay: styled.View`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 100;
  `,
};

export default S;
