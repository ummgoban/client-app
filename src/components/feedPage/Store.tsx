import S from './Store.style';
import {StoreType} from '@/types/StoreType';
import date from '@utils/date';

type Props = {
  store: StoreType;
  onPress: (storeId: number) => void;
};
const Store = ({store, onPress}: Props) => {
  return (
    <S.StoreWrapper onPress={() => onPress(store.id)}>
      <S.StoreImageContainer>
        {store.products.map(product => (
          <S.StoreImageBox key={store.id}>
            <S.StoreImage source={{uri: product.image}} />
            <S.PriceLabel>
              {product.name}: {product.discountPrice.toLocaleString()}원
            </S.PriceLabel>
          </S.StoreImageBox>
        ))}
      </S.StoreImageContainer>
      <S.StoreTitle>{store.name}</S.StoreTitle>
      <S.StorePickupTime>
        {`픽업: ${date.format(
          store.pickupStartAt,
          'HH시 mm분',
        )} ~ ${date.format(store.pickupEndAt, 'HH시 mm분')}`}
      </S.StorePickupTime>
    </S.StoreWrapper>
  );
};

export default Store;
