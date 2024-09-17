import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../types/StackNavigationType';
import { OrderType } from '@/types/OrderType';
import {Text, View} from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import S from './ShoppingCartScreen.style';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  return (
    <S.CartPage>
      <S.ScrollView>

      </S.ScrollView>
    </S.CartPage>
  );
};

export default ShoppingCartScreen;
