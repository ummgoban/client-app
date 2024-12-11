import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import S from './OrderDoneScreen.style';
import {to6DigitHash} from '@/utils/hash';

type Props = StackScreenProps<DetailStackParamList, 'OrderDone'>;

const OrderDoneScreen = ({navigation, route}: Props) => {
  const {orderId, products, originPrice, discountPrice} = route.params;
  const hashOrderId = to6DigitHash(orderId);
  return (
    <S.OrderDoneContainer>
      <S.OrderDoneCard>
        <Title>주문완료</Title>
        <View>
          <Text>주문이 완료되었습니다.</Text>
          <Text>{`주문번호: ${hashOrderId}`}</Text>
        </View>
      </S.OrderDoneCard>
      <S.OrderDoneCard>
        <Title>주문 상품</Title>
        {products.map(product => (
          <S.ProductItem key={product.id}>
            <Text>{product.name}</Text>
            <Text>{`${product.count.toLocaleString()}개`}</Text>
          </S.ProductItem>
        ))}
      </S.OrderDoneCard>
      <S.OrderDoneCard>
        <Title>결제 정보</Title>
        <S.PriceView>
          <S.PriceItem>
            <S.PrimaryText>결제 금액</S.PrimaryText>
            <S.PrimaryText>{`${discountPrice.toLocaleString()}원`}</S.PrimaryText>
          </S.PriceItem>
          <S.PriceItem>
            <Text>상품 금액</Text>
            <Text>{`${originPrice.toLocaleString()}원`}</Text>
          </S.PriceItem>
          <S.PriceItem>
            <Text>할인 금액</Text>
            <Text>{`- ${(originPrice - discountPrice).toLocaleString()}원`}</Text>
          </S.PriceItem>
        </S.PriceView>
      </S.OrderDoneCard>
      <Button onPress={() => navigation.navigate('Home', {screen: 'Feed'})}>
        <Text>홈으로</Text>
      </Button>
    </S.OrderDoneContainer>
  );
};

export default OrderDoneScreen;
