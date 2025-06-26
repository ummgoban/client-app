import styled from '@emotion/native';

const TabBarContainer = styled.View<{
  $padding: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}>`
  display: flex;
  flex-direction: row;

  border-top: 1px solid #c1c9d6;

  padding-top: ${({$padding}) => $padding?.top}px;
  padding-bottom: ${({$padding}) => $padding?.bottom}px;
  padding-left: ${({$padding}) => ($padding?.left || 0) + 12}px;
  padding-right: ${({$padding}) => ($padding?.right || 0) + 12}px;

  background-color: white;
`;

const TabBarItemButton = styled.TouchableOpacity`
  flex: 1;
`;

const TabBarItem = styled.View`
  margin: 0 auto;
  height: 56px;
  padding: 4px;
  box-sizing: border-box;

  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const TabBarText = styled.Text<{isFocused: boolean}>`
  ${({theme}) => theme.fonts.caption};
  color: ${({isFocused, theme}) =>
    isFocused ? theme.colors.primaryLight : theme.colors.disabled};
`;

const S = {
  TabBarContainer,
  TabBarItemButton,
  TabBarItem,
  TabBarText,
};

export default S;
