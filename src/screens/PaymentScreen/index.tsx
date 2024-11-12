import {getBuckets} from '@/apis/Bucket';
import {BucketType} from '@/types/Bucket';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const [cart, setCart] = useState<BucketType | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getBuckets();

        if (!res) {
          console.debug('error');
          setCart(null);
          return;
        }
        setCart(res);
      } catch (e) {
        console.debug(e);
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
