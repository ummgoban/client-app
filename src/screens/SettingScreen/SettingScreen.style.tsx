import styled from '@emotion/native';
import {Switch, Text} from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SettingItemList = styled.View`
  display: flex;
  flex-direction: column;
`;

const SettingItemTitle = styled(Text)`
  ${({theme}) => theme.fonts.subtitle1};
  padding: 8px 16px;
`;

const SettingItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  padding: 8px 16px;

  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
`;

const SettingItemDescriptionContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;

  flex: 1;
`;

const SettingItemDescriptionTitle = styled(Text)`
  ${({theme}) => theme.fonts.default};
`;
const SettingItemDescription = styled(Text)`
  ${({theme}) => theme.fonts.subtitle2};
`;

const SwitchButton = styled(Switch)``;

const S = {
  Container,
  SwitchButton,
  SettingItemList,
  SettingItemTitle,
  SettingItem,
  SettingItemDescriptionContainer,
  SettingItemDescriptionTitle,
  SettingItemDescription,
};

export default S;
