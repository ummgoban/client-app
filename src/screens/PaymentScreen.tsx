import {getCart} from '@/apis';
import {BottomButton} from '@/components/common';
import DatePicker from '@/components/orderPage/DatePicker';
import EmptyCart from '@/components/orderPage/EmptyCart';
import PaymentMethod from '@/components/orderPage/PaymentMethod';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {OrderType} from '@/types/OrderType';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const [cart, setCart] = useState<OrderType | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();

        if (!res) {
          console.log('error');
          setCart(null);
          return;
        }
        setCart(res);
      } catch (e) {
        console.log(e);
        setCart(null);
      }
    };

    fetchCart();
  }, []);

  if (!cart) {
    return (
      <EmptyCart
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  const {originalPrice, discountPrice} = cart.products.reduce(
    (acc, cur) => ({
      originalPrice: acc.originalPrice + cur.originalPrice * cur.count,
      discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
    }),
    {originalPrice: 0, discountPrice: 0},
  );

  return (
    <View>
      <DatePicker />
      <PaymentMethod />
      <PaymentSummary
        originalPrice={originalPrice}
        discountPrice={discountPrice}
      />
      <BottomButton>결제하기</BottomButton>
    </View>
  );
};

export default PaymentScreen;
