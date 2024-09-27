// index.tsx
import React, {useEffect, useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BucketType} from '@/types/Bucket';
import {Alert} from 'react-native';
import {getCartHistory} from '@/apis/Cart';
import {RootStackParamList} from '@/types/StackNavigationType';
import ShoppingCartPage from './ShoppingCartPage';
import EmptyCartPage from './EmptyCartPage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const [cartData, setCartData] = useState<BucketType | null>(null);

  const fetchDummyData = useCallback(async () => {
    try {
      const res = await getCartHistory();
      if (!res || res.length === 0) {
        setCartData(null);
        return;
      }
      setCartData(res[0]);
    } catch (error) {
      console.error(error);
      Alert.alert('장바구니 내역을 불러오는 데 실패했습니다.');
      setCartData(null);
    }
  }, []);

  useEffect(() => {
    fetchDummyData();
  }, [fetchDummyData]);

  const updateProductCount = (id: number, newCount: number) => {
    setCartData(prevCartData => {
      if (!prevCartData) return null;

      const updatedProducts = prevCartData.products
        .map(product =>
          product.id === id ? {...product, count: newCount} : product,
        )
        .filter(product => product.count > 0);

      return {...prevCartData, products: updatedProducts};
    });
  };

  if (!cartData || cartData.products.length === 0) {
    return (
      <EmptyCartPage
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  return (
    <ShoppingCartPage
      navigation={navigation}
      cartData={cartData}
      updateProductCount={updateProductCount}
    />
  );
};

export default ShoppingCartScreen;
