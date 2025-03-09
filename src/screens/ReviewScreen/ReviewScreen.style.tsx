import styled from '@emotion/native';

const S = {
  ReviewScreenContainer: styled.View`
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
    height: 312px;
  `,
};

export default S;
