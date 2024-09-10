import S from './Store.style';
import {StoreType} from '@/types/StoreType';
import {ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import date from '@utils/date';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Store = ({navigation, store}: Props & {store: StoreType | null}) => {
  return (
    <S.StoreWrapper
      onPress={() =>
        navigation.navigate('Detail', {
          screen: 'Store',
          params: {storeId: store!.id},
        })
      }>
      <S.StoreImageContainer>
        {store!.products.map((product, index) => (
          <S.StoreImageBox key={index}>
            <S.StoreImage source={{uri: product.image}} />
            <S.PriceLabel>
              {product.name}: {product.discountPrice}원
            </S.PriceLabel>
          </S.StoreImageBox>
        ))}
      </S.StoreImageContainer>
      <S.StoreTitle>{store!.name}</S.StoreTitle>
      <S.StorePickupTime>
        픽업: {date.format(store!.pickupStartAt, 'HH시 mm분')} ~{' '}
        {date.format(store!.pickupEndAt, 'HH시 mm분')}{' '}
      </S.StorePickupTime>
    </S.StoreWrapper>
  );
};

export default Store;
