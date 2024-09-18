import React, {useEffect, useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/StackNavigationType';
import {CartType, OrderType} from '@/types/OrderType';
import {Alert, Button, Text} from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {getCartHistory} from '@/apis/Cart';
import S from './ShoppingCartScreen.style';
import {ProductType} from '@/types/ProductType';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};
import MarketInfo from '@/components/CartPage/MarketInfo';

const ShoppingCartScreen = ({navigation}: Props) => {
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [products, setProducts] = useState<(ProductType & {count: number})[]>(
    [],
  );

  const fetchDummyData = useCallback(async () => {
    const res = await getCartHistory();
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    setCartData(res[0]);
    setProducts(res[0].products);
    console.log(cartData);
  }, []);

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
            {}
            {products.map(product => (
              <S.CardContainer key={product.id}>
                <S.ProductImage source={{uri: product.image}} />
                <S.HeaderText>{product.name}</S.HeaderText>
                <S.flexRowWrapper>
                  <Button
                    title="-"
                    onPress={() => updateProductCount(product.id, -1)}
                  />
                  <S.DetailText>수량: {product.count}</S.DetailText>
                  <Button
                    title="+"
                    onPress={() => updateProductCount(product.id, 1)}
                  />
                </S.flexRowWrapper>
                <S.DetailText>할인 가격: {product.discountPrice}</S.DetailText>
                <S.DetailText>기존 가격: {product.originalPrice}</S.DetailText>
              </S.CardContainer>
            ))}
          </>
        ) : (
          // TODO: 장바구니 물품 없을 때 수정
          <Text>장바구니가 비어있어요.</Text>
        )}
      </S.ScrollView>
    </S.CartPage>
  );
};

export default ShoppingCartScreen;
