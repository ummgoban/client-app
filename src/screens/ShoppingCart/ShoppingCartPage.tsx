// ShoppingCartPage.tsx
import React, {useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BucketType} from '@/types/Bucket';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import S from './ShoppingCartPage.style';
import MarketInfo from '@/components/CartPage/MarketInfo';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Menu} from '@/components/marketDetailPage';
import {BottomButton} from '@/components/common';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  cartData: BucketType;
  updateProductCount: (id: number, newCount: number) => void;
};

const ShoppingCartPage = ({
  navigation,
  cartData,
  updateProductCount,
}: Props) => {
  const {originalPrice, discountPrice} = useMemo(() => {
    return cartData.products.reduce(
      (acc, cur) => ({
        originalPrice: acc.originalPrice + cur.originalPrice * cur.count,
        discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
      }),
      {originalPrice: 0, discountPrice: 0},
    );
  }, [cartData]);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  const onPressPayment = () => {
    // TODO: 장바구니 담기 post 추가
    navigation.navigate('Detail', {
      screen: 'Payment',
      params: {cartData},
    });
  };

  return (
    <S.CartPage>
      <S.ScrollView>
        <MarketInfo
          onPress={() => onPressStore(cartData.market.id)}
          market={cartData.market}
        />
        {cartData.products.map(product => (
          <Menu
            key={product.id}
            product={product}
            initCount={product.count}
            onCountChange={(productId, count) =>
              updateProductCount(productId, count)
            }
            isCart={true}
          />
        ))}
        <PaymentSummary
          originalPrice={originalPrice}
          discountPrice={discountPrice}
        />
        <BottomButton onPress={onPressPayment}>
          {`${discountPrice.toLocaleString()}원 결제하기`}
        </BottomButton>
      </S.ScrollView>
    </S.CartPage>
  );
};

export default ShoppingCartPage;
