import React from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/StackNavigationType';
import Icon from 'react-native-vector-icons/Feather';

import S from './HeaderIcon.style';

const SettingsIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MyPageRoot', {screen: 'Setting'});
  };

  return (
    <S.IconContainer onPress={handlePress}>
      <Icon name="settings" size={24} color="black" />
    </S.IconContainer>
  );
};

export default SettingsIcon;
