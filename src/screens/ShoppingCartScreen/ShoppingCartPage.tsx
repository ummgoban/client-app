import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Alert} from 'react-native';

import {useUpdateBucket} from '@/apis/buckets';
import MarketInfo from '@/components/CartPage/MarketInfo';
import {BottomButton} from '@/components/common';
import {Menu} from '@/components/marketDetailPage';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import {queryClient} from '@/context/ReactQueryProvider';
import {routeToDetail} from '@/navigation/navigator';

import {BucketType} from '@/types/Bucket';
import {RootStackParamList} from '@/types/StackNavigationType';

import S from './ShoppingCartPage.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  cartData: BucketType;
};

const ShoppingCartPage = ({navigation, cartData}: Props) => {
  const {mutate: updateBucketProduct} = useUpdateBucket();

  const {market, products} = cartData;

  const {originPrice, discountPrice} = useMemo(() => {
    return products.reduce(
      (acc, cur) => ({
        originPrice: acc.originPrice + cur.originPrice * cur.count,
        discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
      }),
      {originPrice: 0, discountPrice: 0},
    );
  }, [products]);

  const closed = useMemo(() => {
    const [endHour, endMinute] = market.closeAt.split(':').map(Number);
    const now = new Date();
    const closeDate = new Date();
    closeDate.setHours(endHour, endMinute, 0, 0);

    return closeDate.getTime() - now.getTime() <= 0;
  }, [market.closeAt]);

  const onPressStore = () => {
    routeToDetail(navigation, cartData.market.id);
  };

  const onPressPayment = () => {
    navigation.navigate('Detail', {
      screen: 'Payment',
      params: {cartData},
    });
  };

  const handlePatchCartProducts = (productId: number, count: number) => {
    updateBucketProduct(
      {productId, count},
      {
        onSuccess: data => {
          queryClient.setQueryData(['bucketList'], data);
        },
        onError: () => {
          Alert.alert('네트워크 오류입니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <S.CartPage>
      <MarketInfo onPress={onPressStore} market={market} />
      <S.ScrollView>
        {products.map(product => (
          <S.CardContainer key={product.id}>
            <Menu
              product={product}
              initCount={product.count}
              onCountChange={handlePatchCartProducts}
              isCart
            />
          </S.CardContainer>
        ))}
        <PaymentSummary
          originPrice={originPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton disabled={closed} onPress={onPressPayment}>
        {closed
          ? '영업이 종료되었어요.'
          : `${discountPrice.toLocaleString()}원 예약하기 (${cartData.products.length})`}
      </BottomButton>
    </S.CartPage>
  );
};

export default ShoppingCartPage;
