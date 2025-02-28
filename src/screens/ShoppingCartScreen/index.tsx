import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

import {useBucketList, useUpdateBucket} from '@/apis/buckets';

import {RootStackParamList} from '@/types/StackNavigationType';

import EmptyCartPage from './EmptyCartPage';
import ShoppingCartPage from './ShoppingCartPage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const {data: cart, isLoading} = useBucketList();
  const {mutateAsync: updateBucket} = useUpdateBucket();

  const handleBucketProductCount = (id: number, newCount: number) => {
    updateBucket({productId: id, count: newCount});
  };

  if (isLoading) {
    return <ActivityIndicator animating size="large" />;
  }

  if (!cart || !cart.products) {
    return (
      <EmptyCartPage
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  return (
    <ShoppingCartPage
      navigation={navigation}
      cartData={cart}
      updateProductCount={handleBucketProductCount}
    />
  );
};

export default ShoppingCartScreen;
