import styled from '@emotion/native';

const TabBarContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TabBarItemButton = styled.TouchableOpacity`
  flex: 1;
`;

const TabBarItem = styled.View`
  margin: 4px auto;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabBarText = styled.Text<{isFocused: boolean}>`
  ${({theme}) => theme.fonts.body2};
  color: ${({isFocused, theme}) =>
    isFocused ? theme.colors.primary : theme.colors.tertiary};
`;

const S = {
  TabBarContainer,
  TabBarItemButton,
  TabBarItem,
  TabBarText,
};

export default S;
