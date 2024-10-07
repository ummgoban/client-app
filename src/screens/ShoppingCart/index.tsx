import React, {useEffect, useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BucketType} from '@/types/Bucket';
import {Alert} from 'react-native';
import {getCartHistory} from '@/apis/Cart';
import {RootStackParamList} from '@/types/StackNavigationType';
import ShoppingCartPage from './ShoppingCartPage';
import EmptyCartPage from './EmptyCartPage';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  const [cartData, setCartData] = useState<BucketType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDummyData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCartHistory();
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
  //TODO: Suspense로 로직 변경
  if (isLoading) {
    return <ActivityIndicator animating size="large" />;
  }

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
