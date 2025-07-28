import styled from '@emotion/native';

type ContentProp = {
  $horizontal: 'right' | 'left';
  $vertical: 'top' | 'bottom';
};

const S = {
  DropdownLayout: styled.View`
    position: relative;
  `,

  ButtonWrapper: styled.TouchableOpacity`
    background-color: transparent;
    border: none;
  `,

  ContentWrapper: styled.View<ContentProp>`
    position: absolute;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 12px;
    background-color: white;
    top: 100px; /* 임시 값. 조정 필요 */
    ${({$horizontal}) =>
      $horizontal === 'left' ? 'left: 0px;' : 'right: 0px;'}
    elevation: 4;
    shadow-color: ${props => props.theme.colors.tertiaryDisabled};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
  `,

  ItemWrapper: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-right: 40px;
    margin-bottom: 12px;
  `,
};

export default S;
