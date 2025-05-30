import React, {useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BucketType} from '@/types/Bucket';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import S from './ShoppingCartPage.style';
import MarketInfo from '@/components/CartPage/MarketInfo';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Menu} from '@/components/marketDetailPage';
import {BottomButton} from '@/components/common';
import {useUpdateBucket} from '@/apis/buckets';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  cartData: BucketType;
};

const ShoppingCartPage = ({navigation, cartData}: Props) => {
  const {mutate: updateBucketProduct} = useUpdateBucket();
  const [marketData, setMarketData] = useState<BucketType | null>(cartData);

  const market = marketData?.market ?? cartData.market;
  const products = marketData?.products ?? cartData.products;

  const {originPrice, discountPrice} = useMemo(() => {
    return products.reduce(
      (acc, cur) => ({
        originPrice: acc.originPrice + cur.originPrice * cur.count,
        discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
      }),
      {originPrice: 0, discountPrice: 0},
    );
  }, [marketData]);

  const closed = useMemo(() => {
    const [endHour, endMinute] = market.closeAt.split(':').map(Number);
    const now = new Date();
    const closeDate = new Date();
    closeDate.setHours(endHour, endMinute, 0, 0);

    return closeDate.getTime() - now.getTime() <= 0;
  }, [market.closeAt]);

  const onPressStore = () => {
    navigation.navigate('Detail', {
      screen: 'MarketDetail',
      params: {marketId: cartData.market.id},
    });
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
          setMarketData(data);
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
