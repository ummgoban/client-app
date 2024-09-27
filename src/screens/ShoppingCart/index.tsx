import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../../types/StackNavigationType';
import {BucketType} from '@/types/Bucket';
import {Alert, Text} from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {getCartHistory} from '@/apis/Cart';
import S from './ShoppingCartScreen.style';
// type Props = {
//   navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
// };
import MarketInfo from '@/components/CartPage/MarketInfo';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Menu} from '@/components/marketDetailPage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// TODO: navigation: Cart 추가
const ShoppingCartScreen = ({navigation}: Props) => {
  // TODO: 결제 페이지로 이동 props 버튼
  const [cartData, setCartData] = useState<BucketType | null>(null);

  const fetchDummyData = useCallback(async () => {
    const res = await getCartHistory();
    if (!res) {
      Alert.alert('장바구니내역받아오기실패.');
      return;
    }
    setCartData(res[0]);
  }, []);

  const {originalPrice, discountPrice} = useMemo(() => {
    if (!cartData) {
      return {originalPrice: 0, discountPrice: 0};
    }

    return cartData.products.reduce(
      (acc, cur) => ({
        originalPrice: acc.originalPrice + cur.originalPrice * cur.count,
        discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
      }),
      {originalPrice: 0, discountPrice: 0},
    );
  }, [cartData]);

  const updateProductCount = (id: number, newCount: number) => {
    setCartData(prevCartData => {
      if (!prevCartData) return prevCartData;

      const updatedProducts = prevCartData.products
        .map(product =>
          product.id === id ? {...product, count: newCount} : product,
        )
        .filter(product => product.count > 0);
      return {...prevCartData, products: updatedProducts};
    });
  };

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  useEffect(() => {
    fetchDummyData();
  }, [fetchDummyData]);

  return (
    <S.CartPage>
      <S.ScrollView>
        {cartData ? (
          <>
            <MarketInfo
              onPress={() => onPressStore(cartData.market.id)}
              market={cartData.market}
            />
            {cartData.products.map(product => (
              <Menu
                key={product.id}
                product={product}
                initCount={product.count}
                onCountChange={(productId, count) =>
                  updateProductCount(productId, count)
                }
              />
            ))}
            <PaymentSummary
              originalPrice={originalPrice}
              discountPrice={discountPrice}
            />
          </>
        ) : (
          <Text>장바구니가 비어있어요.</Text>
        )}
      </S.ScrollView>
    </S.CartPage>
  );
};

export default ShoppingCartScreen;
