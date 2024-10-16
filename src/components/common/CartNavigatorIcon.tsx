import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@/types/StackNavigationType';

const CartIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Cart');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{marginRight: 15}}></TouchableOpacity>
  );
};

export default CartIcon;
