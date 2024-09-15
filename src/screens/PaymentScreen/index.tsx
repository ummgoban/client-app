import {CartType} from '@/types/OrderType';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {getCart} from '@/apis';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const [cart, setCart] = useState<CartType | null>(null);

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
      <EmptyCartPage
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  return <PaymentPage cart={cart} />;
};

export default PaymentScreen;
