import styled from '@emotion/native';

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
  `,
  OwnerReplyContainer: styled.View`
    background-color: ${props => props.theme.colors.primaryPressed};
    border-radius: 12px;
    flex: 1;
    margin-left: 8px;
    padding: 12px 16px;
  `,

  OwnerText: styled.Text`
    ${props => props.theme.fonts.titleMedium};
    color: black;
    font-family: Pretendard;
    font-weight: 600;
    margin-right: 6px;
  `,

  ReviewReplyHeader: styled.View`
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  `,
  ReviewReplyCreatedAtText: styled.Text`
    ${({theme}) => theme.fonts.caption};
    color: ${props => props.theme.colors.tertiaryDisabled};
    font-weight: 400;
  `,
  ReviewReplyBody: styled.Text`
    ${props => props.theme.fonts.titleSmall};
    color: black;
    font-family: Pretendard;
    font-weight: 400;
  `,
};

export default S;
