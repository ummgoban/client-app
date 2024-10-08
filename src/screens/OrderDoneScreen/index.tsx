import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import S from './OrderDoneScreen.style';

type Props = StackScreenProps<DetailStackParamList, 'OrderDone'>;

const OrderDoneScreen = ({navigation, route}: Props) => {
  const {orderId} = route.params;

  return (
    <S.OrderDoneCard>
      <Title>주문완료</Title>
      <View>
        <Text>주문이 완료되었습니다.</Text>
        <Text>{`주문번호: ${orderId}`}</Text>
      </View>
      <Button onPress={() => navigation.navigate('Home', {screen: 'Feed'})}>
        <Text>홈으로</Text>
      </Button>
    </S.OrderDoneCard>
  );
};

export default OrderDoneScreen;
