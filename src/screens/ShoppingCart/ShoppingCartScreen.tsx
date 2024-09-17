import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../types/StackNavigationType';
import { CartType, OrderType } from '@/types/OrderType';
import { Alert, Text } from 'react-native';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import { getCartHistory } from '@/apis/Cart';
import S from './ShoppingCartScreen.style';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};
import MarketInfo from '@/components/CartPage/MarketInfo';

const ShoppingCartScreen = ({navigation}: Props) => {
  const [cartData, setCartData] = useState<CartType | null>();
  useEffect(() => {
    const fetchDummyData = async () => {
        const data = await getCartHistory();
        if(!data) {
          Alert.alert('장바구니가 비어있어요');
          return;
        }
        setCartData(data[0]);
    }
    fetchDummyData();
    console.log(cartData);
  }, []);

  return (
    <S.CartPage>
      <S.ScrollView>
        {cartData ? (
          <>
            <MarketInfo market={cartData.market} />
          </>
        ) : (
          <Text>장바구니가 비어있어요.</Text>
        )}
      </S.ScrollView>
    </S.CartPage>
  );
};

export default ShoppingCartScreen;
