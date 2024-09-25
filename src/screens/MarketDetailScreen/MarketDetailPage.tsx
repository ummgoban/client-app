import React, {useRef, useState, useCallback} from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import date from '@utils/date';
import Menu from '@/components/marketDetailPage/Menu';
import S from './MarketDetail.style';
import {MarketType} from '@/types/Market';
import {ProductType} from '@/types/ProductType';

//TODO: 장바구니 타입 확정 후 네비게이션

type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

const MarketDetailPage = ({
  name,
  pickupStartAt,
  pickupEndAt,
  address,
  products,
}: Omit<MarketType, 'id' | 'images'>) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('추천메뉴');
  const scrollViewRef = useRef<ScrollView>(null);
  const tagScrollViewRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<{[key: string]: number}>(
    {},
  );
  const [sectionHeights, setSectionHeights] = useState<{[key: string]: number}>(
    {},
  );
  const [tagWidths, setTagWidths] = useState<{[key: string]: number}>({});

  const handleCountChange = (productId: number, newCount: number) => {
    handleCart(
      productId,
      products.find(product => product.id === productId)?.name || '',
      newCount,
    );
  };
  const handleCart = (
    productId: number,
    productName: string,
    count: number,
  ) => {
    setCart(prevCart => {
      if (count === 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
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
    (acc: {[key: string]: ProductType[]}, product) => {
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
      if (tagScrollViewRef.current && tagWidths[tag] !== undefined) {
        const tagIndex = Object.keys(productsByTags).indexOf(tag);
        const tagWidth = tagWidths[tag];
        tagScrollViewRef.current.scrollTo({
          x: tagWidth * tagIndex,
          animated: true,
        });
      }
    },
    [productsByTags, tagWidths],
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    Object.keys(sectionOffsets).forEach(tag => {
      const sectionHeight = sectionHeights[tag] || 0;
      const sectionOffset = sectionOffsets[tag];

      if (
        contentOffsetY >= sectionOffset - sectionHeight / 2 &&
        contentOffsetY < sectionOffset + sectionHeight / 2
      ) {
        if (selectedTag !== tag) {
          setSelectedTag(tag);
          scrollToSidebarTag(tag);
        }
      }
    });
  };

  const updateSectionOffsets = useCallback(() => {
    const newOffsets: {[key: string]: number} = {};
    let currentOffset = 0;

    Object.keys(productsByTags).forEach(tag => {
      newOffsets[tag] = currentOffset;
      currentOffset += sectionHeights[tag] || 0;
    });

    setSectionOffsets(newOffsets);
  }, [productsByTags, sectionHeights]);

  const handleTagLayout = (tag: string) => (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setTagWidths(prevWidths => ({
      ...prevWidths,
      [tag]: width,
    }));
  };

  const handleLayout = (tag: string) => (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setSectionHeights(prevHeights => ({
      ...prevHeights,
      [tag]: height,
    }));
    updateSectionOffsets();
  };

  return (
    <S.MarketDetailInfoView>
      {/* <MarketImageSlider /> */}
      <S.MarketMainInfoWrapper>
        <S.MarKetName>{name} </S.MarKetName>
        <S.MarketDescription>
          내 자식에게 준다는 마음으로 음식을 만들고 있습니다^^
        </S.MarketDescription>
        <S.MarketTimeDescription>
          {`픽업 마감까지 ${date.format(pickupEndAt - Date.now(), 'HH시간 mm분')} 남았습니다!`}
        </S.MarketTimeDescription>
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
            onLayout={handleTagLayout(tag)}
            onPress={() => {
              setSelectedTag(tag);
              scrollToSection(tag);
              scrollToSidebarTag(tag);
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

      <S.MenuScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        onLayout={updateSectionOffsets}>
        {Object.entries(productsByTags).map(([tag, productsByTag]) => (
          <S.MenuView key={tag} onLayout={handleLayout(tag)}>
            <View>
              <S.MenuText>{tag}</S.MenuText>
              {productsByTag.map(product => (
                <Menu
                  key={product.id}
                  product={product}
                  initCount={
                    cart.find(item => item.productId === product.id)?.count || 0
                  }
                  onCountChange={handleCountChange}
                />
              ))}
            </View>
          </S.MenuView>
        ))}
      </S.MenuScrollView>

      <S.ReserveButton onPress={handleCheckout}>
        <S.ButtonText>예약하기 ({cart.length})</S.ButtonText>
      </S.ReserveButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailPage;
