import styled from '@emotion/native';

const S = {
  Container: styled.View`
    background-color: white;
    margin-bottom: 20px;
  `,
  CustomerNameText: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
    margin-right: 6px;
  `,
  ReviewHeaderWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    justify-content: space-between;
  `,
  ReviewHeaderLeft: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,
  ReviewCreatedText: styled.Text`
    ${({theme}) => theme.fonts.caption};
    color: ${props => props.theme.colors.tertiaryDisabled};
    font-weight: 400;
  `,
  OrderInfoWrapper: styled.View`
    display: flex;
    align-items: flex-start;
    width: auto;
    margin: 16px 0px;
  `,

  OrderInfoTextWrapper: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    padding: 2px 8px;
  `,
  OrderInfoText: styled.Text`
    ${({theme}) => theme.fonts.body2};
    color: ${props => props.theme.colors.tertiary};
    font-weight: 600;
  `,
  CustomerReviewText: styled.Text`
    ${({theme}) => theme.fonts.body1};
    color: ${props => props.theme.colors.tertiary};
  `,
  ReviewCountText: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
    padding-left: 2px;
    margin-right: -14px;
  `,

  ImagesContainer: styled.ScrollView`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 12px;
    gap: 8px;
  `,
  ImageWrapper: styled.View`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 128px;
    border-radius: 8px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 8px;
  `,
};

export default S;
