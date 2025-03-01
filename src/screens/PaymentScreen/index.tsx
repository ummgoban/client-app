import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

import {useBucketList} from '@/apis/buckets';
import {useMarket} from '@/apis/markets';

import {DetailStackParamList} from '@/types/StackNavigationType';

import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const {data: cart} = useBucketList();
  const {data: market} = useMarket(cart?.market.id);

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
