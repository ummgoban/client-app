import React, {useRef, useState, useCallback, useEffect} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import date from '@utils/date';
import Menu from '@/components/marketDetailPage/Menu';
import {ScrollView} from 'react-native-gesture-handler';
import S from './MarketDetail.style';
import {MarketType} from '@/types/Market';

type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

const MarketDetailPage = ({detail}: {detail: MarketType}) => {
  const {name, pickupStartAt, pickupEndAt, address, products} = detail;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('추천메뉴');

  const scrollViewRef = useRef<ScrollView>(null);
  const tagScrollViewRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<{[key: string]: number}>(
    {},
  );

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

  const scrollToSection = useCallback(
    (tag: string) => {
      if (scrollViewRef.current && sectionOffsets[tag] !== undefined) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: sectionOffsets[tag],
          animated: true,
        });
      }
    },
    [sectionOffsets],
  );

  const scrollToSidebarTag = useCallback(
    (tag: string) => {
      if (tagScrollViewRef.current) {
        tagScrollViewRef.current.scrollTo({
          x: 100 * Object.keys(productsByTags).indexOf(tag),
          animated: true,
        });
      }
    },
    [productsByTags],
  );

  useEffect(() => {
    if (selectedTag) {
      scrollToSidebarTag(selectedTag);
    }
  }, [selectedTag, scrollToSidebarTag]);

  return (
    <S.MarketDetailInfoView>
      {/* <MarketImageSlider /> */}
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
      <S.SideTagBarScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={tagScrollViewRef}>
        {Object.keys(productsByTags).map(tag => (
          <TouchableOpacity
            key={tag}
            onPress={() => {
              setSelectedTag(tag);
              scrollToSection(tag);
            }}>
            <S.SideBarView selected={selectedTag === tag}>
              <S.SideBarText selected={selectedTag === tag}>
                {tag}
              </S.SideBarText>
            </S.SideBarView>
          </TouchableOpacity>
        ))}
      </S.SideTagBarScrollView>

      <S.Divider />

      <ScrollView
        ref={scrollViewRef}
        onScroll={event => {
          const contentOffsetY = event.nativeEvent.contentOffset.y;
          Object.keys(sectionOffsets).forEach(tag => {
            if (
              contentOffsetY >= sectionOffsets[tag] &&
              contentOffsetY < sectionOffsets[tag] + 100
            ) {
              setSelectedTag(tag);
            }
          });
        }}
        onLayout={() => {
          let offsetY = 0;
          Object.keys(productsByTags).forEach(tag => {
            sectionOffsets[tag] = offsetY;
            offsetY += 200;
          });
          setSectionOffsets({...sectionOffsets});
        }}>
        {Object.keys(productsByTags).map(tag => (
          <View
            key={tag}
            onLayout={event => {
              const {y} = event.nativeEvent.layout;
              setSectionOffsets(prevOffsets => ({
                ...prevOffsets,
                [tag]: y,
              }));
            }}>
            <S.MenuView>
              <S.MenuText>{tag}</S.MenuText>
              {productsByTags[tag].map(product => (
                <Menu
                  key={product.id}
                  product={product}
                  cart={cart}
                  onCountChange={handleCart}
                />
              ))}
            </S.MenuView>
          </View>
        ))}
      </ScrollView>

      <S.ReserveButton onPress={handleCheckout}>
        <S.ButtonText>예약하기 ({cart.length})</S.ButtonText>
      </S.ReserveButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailPage;
