import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, Text, TouchableOpacity} from 'react-native';
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
  console.log(route.params.market);
  const marketSampleData = {
    id: 1,
    name: '반찬가게1',
    pickupStartAt: 1609718400000,
    pickupEndAt: 1609728400000,
    products: [
      {
        id: 1,
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 10000,
        discountPrice: 7000,
        tags: ['추천메뉴', '김치류'],
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 5000,
        discountPrice: 3000,
        tags: ['깻잎류'],
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        tags: ['추천메뉴', '게장류'],
      },
      {
        id: 4,
        name: '양념게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        tags: ['게장류'],
      },
    ],
    address: '서울특별시 동대문구 휘경동',
    images: ['https://legacy.reactjs.org/logo-og.png'],
  };
  const {name, pickupStartAt, pickupEndAt, address, products} =
    marketSampleData;

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

  const [selectedTag, setSelectedTag] = useState<string | null>('추천메뉴');

  const productsByTags = products.reduce(
    (acc: {[key: string]: any[]}, product) => {
      product.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(product);
      });
      return acc;
    },
    {},
  );

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

      <S.SideTagBarScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(productsByTags).map(tag => (
          <TouchableOpacity key={tag} onPress={() => setSelectedTag(tag)}>
            <S.SideBarView selected={selectedTag === tag}>
              <S.SideBarText selected={selectedTag === tag}>
                {tag}
              </S.SideBarText>
            </S.SideBarView>
          </TouchableOpacity>
        ))}
      </S.SideTagBarScrollView>

      <S.Divider />

      <ScrollView>
        {selectedTag && productsByTags[selectedTag] && (
          <S.MenuView>
            <S.MenuText>{selectedTag}</S.MenuText>
            {productsByTags[selectedTag].map(product => (
              <Menu
                key={product.id}
                product={product}
                onCountChange={handleCart}
              />
            ))}
          </S.MenuView>
        )}

        {Object.keys(productsByTags)
          .filter(tag => tag !== selectedTag)
          .map(tag => (
            <S.MenuView key={tag}>
              <S.MenuText>{tag}</S.MenuText>
              {productsByTags[tag].map(product => (
                <Menu
                  key={product.id}
                  product={product}
                  onCountChange={handleCart}
                />
              ))}
            </S.MenuView>
          ))}
      </ScrollView>

      <S.ReserveButton onPress={handleCheckout}>
        <S.ButtonText>예약하기</S.ButtonText>
      </S.ReserveButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailScreen;
