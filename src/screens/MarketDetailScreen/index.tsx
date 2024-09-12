import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, Text} from 'react-native';
import {DetailStackParamList} from '@/types/StackNavigationType';
import date from '@utils/date';
import Menu from '@/components/marketDetailPage/Menu';
import {ScrollView} from 'react-native-gesture-handler';
import S from './MarketDetail.style';
import {useState} from 'react';
type Props = StackScreenProps<DetailStackParamList, 'Market'>;
type CartItem = {
  productId: number;
  productName: string;
  count: number;
};
const MarketDetailScreen = ({route}: Props) => {
  const {name, pickupStartAt, pickupEndAt, address, products} =
    route.params.market;

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleCart = (
    productId: number,
    productName: string,
    count: number,
  ) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.productId === productId,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {productId, productName, count};
        return updatedCart;
      } else {
        return [...prevCart, {productId, productName, count}];
      }
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('장바구니가 비어 있습니다.');
      return;
    }

    const cartSummary = cart
      .map(item => `${item.productName} 수량: ${item.count}`)
      .join('\n');

    Alert.alert('장바구니로 이동합니다', cartSummary);
  };

  return (
    <S.MarketDetailInfoView>
      <Text>...Market Image..</Text>
      <S.Divider />
      <S.MarketMainInfoWrapper>
        <S.MarKetName>{name} </S.MarKetName>
        <S.MarketDescription>
          내 자식에게 준다는 마음으로 음식을 만들고 있습니다^^
        </S.MarketDescription>
      </S.MarketMainInfoWrapper>
      <S.MarketSideInfoWrapper>
        <S.MarketSideInfo>{`픽업: ${date.format(
          pickupStartAt,
          'HH시 mm분',
        )} ~ ${date.format(pickupEndAt, 'HH시 mm분')}`}</S.MarketSideInfo>
        <S.MarketSideInfo>{address}</S.MarketSideInfo>
      </S.MarketSideInfoWrapper>

      <S.Divider />
      <Text>...Sliding TabBar....</Text>
      <S.Divider />
      <S.Divider />
      <ScrollView>
        {products.map(product => (
          <Menu key={product.id} product={product} onCountChange={handleCart} />
        ))}
      </ScrollView>
      <S.ReserveButton onPress={handleCheckout}>
        <S.ButtonText>예약하기</S.ButtonText>
      </S.ReserveButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailScreen;
