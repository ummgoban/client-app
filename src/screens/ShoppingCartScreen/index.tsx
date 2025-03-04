import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

import {useBucketList} from '@/apis/buckets';

import {RootStackParamList} from '@/types/StackNavigationType';

import EmptyComponent from '@/components/common/EmptyComponent';

import ShoppingCartPage from './ShoppingCartPage';
import useProfile from '@/hooks/useProfile';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const {data: cart, isLoading} = useBucketList();
  const {profile} = useProfile();

  if (isLoading) {
    return <ActivityIndicator animating size="large" />;
  }

  if (!profile) {
    return (
      <EmptyComponent
        title="로그인 후 판매 중인 반찬을 예약해보세요."
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
        buttonText="로그인하러 가기"
      />
    );
  }

  if (!cart || !cart.products) {
    return (
      <EmptyComponent
        title="장바구니가 비어있어요."
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
        buttonText="주문하러 가기"
      />
    );
  }

  return <ShoppingCartPage navigation={navigation} cartData={cart} />;
};

export default ShoppingCartScreen;
