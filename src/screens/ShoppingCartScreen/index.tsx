import {getBuckets} from '@/apis/Bucket';
import {BucketType} from '@/types/Bucket';
import {RootStackParamList} from '@/types/StackNavigationType';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import EmptyCartPage from './EmptyCartPage';
import ShoppingCartPage from './ShoppingCartPage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const [cartData, setCartData] = useState<BucketType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBucketData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getBuckets();
      if (!response) {
        setCartData(null);
        return;
      } else {
        setCartData(response);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('장바구니 내역을 불러오는 데 실패했습니다.');
      setCartData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBucketData();
  }, [fetchBucketData]);

  const handleBucketProductCount = (id: number, newCount: number) => {
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
  //TODO: Suspense로 로직 변경
  if (isLoading) {
    return <ActivityIndicator animating size="large" />;
  }

  if (!cartData || !cartData.products) {
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
      updateProductCount={handleBucketProductCount}
    />
  );
};

export default ShoppingCartScreen;
