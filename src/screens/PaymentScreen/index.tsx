import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';

import {getBuckets} from '@/apis/Bucket';
import {useMarket} from '@/apis/markets';
import {BucketType} from '@/types/Bucket';
import {DetailStackParamList} from '@/types/StackNavigationType';
import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const [cart, setCart] = useState<BucketType | null>(null);

  const {data: market} = useMarket(cart?.market.id);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  if (!cart || !market) {
    return (
      <EmptyCartPage
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  return <PaymentPage cart={cart} market={market} />;
};

export default PaymentScreen;
