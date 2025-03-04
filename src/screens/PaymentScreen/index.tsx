import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

import {useBucketList} from '@/apis/buckets';

import {DetailStackParamList} from '@/types/StackNavigationType';

import EmptyCartPage from './EmptyCartPage';
import PaymentPage from './PaymentPage';

type Props = StackScreenProps<DetailStackParamList, 'Payment'>;

const PaymentScreen = ({navigation}: Props) => {
  const {data: cart} = useBucketList();

  if (!cart) {
    return (
      <EmptyCartPage
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
      />
    );
  }

  return <PaymentPage cart={cart} marketId={cart.market.id} />;
};

export default PaymentScreen;
