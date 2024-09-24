import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../../types/StackNavigationType';
import {CartType} from '@/types/OrderType';
import {Alert, Text} from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {getCartHistory} from '@/apis/Cart';
import S from './ShoppingCartScreen.style';
// type Props = {
//   navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
// };
import MarketInfo from '@/components/CartPage/MarketInfo';
import {RootStackParamList} from '@/types/StackNavigationType';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// TODO: navigation: Cart 추가
const ShoppingCartScreen = ({navigation}: Props) => {
  // TODO: 결제 페이지로 이동 props 버튼
  const [cartData, setCartData] = useState<CartType | null>(null);

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

  const updateProductCount = (id: number, changeTerm: number) => {
    if (!cartData) return;
    setCartData(prevCartData => {
      if (!prevCartData) return prevCartData;

      const updatedProducts = prevCartData.products
        .map(product =>
          product.id === id
            ? {...product, count: Math.max(0, product.count + changeTerm)}
            : product,
        )
        .filter(product => product.count > 0);
      console.log(cartData);
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
              <S.CardContainer key={product.id}>
                <S.ProductImageWrapper>
                  <S.ProductImage source={{uri: product.image}} />
                </S.ProductImageWrapper>
                <S.ProductInfoWrapper>
                  <S.HeaderText>{product.name}</S.HeaderText>
                  <S.DetailText>
                    할인 가격: {product.discountPrice.toLocaleString()}원
                  </S.DetailText>
                  <S.DetailText>
                    기존 가격: {product.originalPrice.toLocaleString()}원
                  </S.DetailText>
                  <S.ButtonWrapper>
                    <S.Button>
                      <S.DetailText>옵션 변경</S.DetailText>
                    </S.Button>
                    {product.count > 1 ? (
                      <S.Button
                        onPress={() => updateProductCount(product.id, -1)}>
                        <S.CountText>-</S.CountText>
                      </S.Button>
                    ) : (
                      <S.Button
                        onPress={() => updateProductCount(product.id, -1)}>
                        <S.CountText>삭제</S.CountText>
                      </S.Button>
                    )}
                    <S.CountText>{product.count}</S.CountText>
                    <S.Button onPress={() => updateProductCount(product.id, 1)}>
                      <S.CountText>+</S.CountText>
                    </S.Button>
                  </S.ButtonWrapper>
                </S.ProductInfoWrapper>
              </S.CardContainer>
            ))}
            <PaymentSummary
              originalPrice={originalPrice}
              discountPrice={originalPrice - discountPrice}
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
