import React from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/StackNavigationType';
import Icon from 'react-native-vector-icons/Feather';
import S from './CartNaviagtorIcon.style';
const CartIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CartRoot');
  };

  return (
    <S.IconContainer onPress={handlePress}>
      <Icon name="shopping-cart" size={24} color="black" />
    </S.IconContainer>
  );
};

export default CartIcon;
