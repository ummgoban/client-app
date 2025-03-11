import styled from '@emotion/native';

const S = {
  Container: styled.ScrollView`
    display: flex;
    flex-direction: row;
    flex: 1;

    width: 100%;
  `,
  ImageUploadButton: styled.TouchableOpacity`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 1px solid;
    border-color: ${props => props.theme.colors.tertiaryDisabled};
    border-radius: 8px;
    margin-right: 8px;
  `,

  UploadedImageWrapper: styled.View`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 1px solid;
    border-color: ${props => props.theme.colors.tertiaryDisabled};
    border-radius: 8px;
    margin-right: 8px;
  `,
  UploadedImage: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 8px;
  `,
  ImageUploadText: styled.Text`
    ${({theme}) => theme.fonts.body2};
    color: ${props => props.theme.colors.tertiary};
    font-weight: 400;
  `,
};

export default S;
