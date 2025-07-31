import styled from '@emotion/native';

const TabBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 12px;
  border-top: 1px solid #c1c9d6;
  background-color: white;
`;

const TabBarItemButton = styled.TouchableOpacity`
  flex: 1;
`;

const TabBarItem = styled.View`
  margin: 0 auto;
  height: 56px;
  padding: 4px;

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
