import React, {useMemo} from 'react';
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
  const {mutateAsync: updateBucketProduct} = useUpdateBucket();

  const {originPrice, discountPrice} = useMemo(() => {
    return cartData.products.reduce(
      (acc, cur) => ({
        originPrice: acc.originPrice + cur.originPrice * cur.count,
        discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
      }),
      {originPrice: 0, discountPrice: 0},
    );
  }, [cartData]);

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

  return (
    <S.CartPage>
      <MarketInfo onPress={onPressStore} market={cartData.market} />
      <S.ScrollView>
        {cartData.products.map(product => (
          <S.CardContainer key={product.id}>
            <Menu
              product={product}
              initCount={product.count}
              onCountChange={async (productId: number, count: number) => {
                return await updateBucketProduct({productId, count});
              }}
              isCart
            />
          </S.CardContainer>
        ))}
        <PaymentSummary
          originPrice={originPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton onPress={onPressPayment}>
        {`${discountPrice.toLocaleString()}원 예약하기 (${cartData.products.length})`}
      </BottomButton>
    </S.CartPage>
  );
};

export default ShoppingCartPage;
