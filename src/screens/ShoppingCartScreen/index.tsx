import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

import {useBucketList} from '@/apis/buckets';

import {RootStackParamList} from '@/types/StackNavigationType';

import EmptyMarket from '@/components/common/EmptyMarket';

import ShoppingCartPage from './ShoppingCartPage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const {data: cart, isLoading} = useBucketList();

  if (isLoading) {
    return <ActivityIndicator animating size="large" />;
  }

  if (!cart || !cart.products) {
    return (
      <EmptyMarket
        title="장바구니가 비어있어요."
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
        buttonText="주문하러 가기"
      />
    );
  }

  return <ShoppingCartPage navigation={navigation} cartData={cart} />;
};

export default ShoppingCartScreen;
