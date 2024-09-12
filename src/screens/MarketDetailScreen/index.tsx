import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, Text} from 'react-native';
import {DetailStackParamList} from '@/types/StackNavigationType';
import date from '@utils/date';
import Menu from '@/components/marketDetailPage/Menu';
import {ScrollView} from 'react-native-gesture-handler';
import S from './MarketDetail.style';
type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketDetailScreen = ({route}: Props) => {
  const {name, pickupStartAt, pickupEndAt, address, products} =
    route.params.market;

  return (
    <S.MarketDetailInfoView>
      <Text>Market Image..</Text>
      <Text>{name} </Text>
      <Text>description area...</Text>
      <Text>{`픽업: ${date.format(
        pickupStartAt,
        'HH시 mm분',
      )} ~ ${date.format(pickupEndAt, 'HH시 mm분')}`}</Text>
      <Text>{address}</Text>
      <Text>추천상품</Text>
      <ScrollView>
        {products.map(product => (
          <Menu key={product.id} product={product} />
        ))}
      </ScrollView>
      <S.ReserveButton onPress={() => Alert.alert('장바구니 페이지로 이동')}>
        <S.ButtonText>예약하기</S.ButtonText>
      </S.ReserveButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailScreen;
