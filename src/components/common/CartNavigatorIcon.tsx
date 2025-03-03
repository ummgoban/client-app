import React from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {RootStackParamList} from '@/types/StackNavigationType';
import BagIcon from '@/assets/icons/bag-bold.svg';

import S from './HeaderIcon.style';

const CartIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CartRoot');
  };

  return (
    <S.IconContainer onPress={handlePress}>
      <BagIcon width={24} height={24} color="rgba(29, 38, 58, 1)" />
    </S.IconContainer>
  );
};

export default CartIcon;
