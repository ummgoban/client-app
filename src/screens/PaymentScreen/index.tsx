import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';

import {getMarket} from '@/apis';
import {getBuckets} from '@/apis/Bucket';
import {BucketType} from '@/types/Bucket';
import {MarketDetailType} from '@/types/Market';
import {DetailStackParamList} from '@/types/StackNavigationType';
import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const [cart, setCart] = useState<BucketType | null>(null);
  const [market, setMarket] = useState<MarketDetailType | null>(null);

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

        const marketRes = await getMarket(res.market.id);
        if (!marketRes) {
          console.debug('error');
          setMarket(null);
          return;
        }
        setMarket(marketRes);
      } catch (e) {
        console.debug(e);
        setCart(null);
        setMarket(null);
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
