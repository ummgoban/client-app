import React, {useEffect, useState, useCallback, useMemo} from 'react';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../../types/StackNavigationType';
import {CartType} from '@/types/OrderType';
import {Alert, Text} from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {getCartHistory} from '@/apis/Cart';
import S from './ShoppingCartScreen.style';
import {ProductType} from '@/types/ProductType';
// type Props = {
//   navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
// };
import MarketInfo from '@/components/CartPage/MarketInfo';

// TODO: navigation: Cart 추가
const ShoppingCartScreen = () => {
  // TODO: 결제 페이지로 이동 props 버튼
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [products, setProducts] = useState<(ProductType & {count: number})[]>(
    [],
  );

  const fetchDummyData = useCallback(async () => {
    const res = await getCartHistory();
    if (!res) {
      Alert.alert('장바구니내역받아오기실패.');
      return;
    }
    setCartData(res[0]);
    setProducts(res[0].products);
  }, []);

  const {originalPrice, discountPrice} = useMemo(
    () =>
      products.reduce(
        (acc, cur) => ({
          originalPrice: acc.originalPrice + cur.originalPrice * cur.count,
          discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
        }),
        {originalPrice: 0, discountPrice: 0},
      ),
    [products],
  );

  const updateProductCount = (id: number, changeTerm: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? {...product, count: Math.max(1, product.count + changeTerm)}
          : product,
      ),
    );
  };

  useEffect(() => {
    fetchDummyData();
  }, [fetchDummyData]);

  return (
    <S.CartPage>
      <S.ScrollView>
        {cartData ? (
          <>
            <MarketInfo market={cartData.market} />
            {products.map(product => (
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
                    <S.Button
                      onPress={() => updateProductCount(product.id, -1)}>
                      <S.CountText>-</S.CountText>
                    </S.Button>
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
