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
import {zeroPad, format} from '@utils/date';
import Menu from '@/components/marketDetailPage/Menu';
import S from './MarketDetail.style';
import {ProductType} from '@/types/ProductType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import SubscribeIcon from '@/components/common/SubscribeIcon';
import {BottomButton} from '@/components/common';
import {MarketDetailType} from '@/types/Market';
type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

const MarketDetailPage = ({
  pickupStartAt,
  pickupEndAt,
  address,
  products,
  hasLike,
  id,
  specificAddress,
  summary,
  // TODO: 영업 및 픽업시간 현재 분리, 통일 및 어떤 시간 사용할지 논의
}: Omit<MarketDetailType, 'images' | 'openAt' | 'closeAt' | 'imageUrls'>) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
  const [marketIsLiked, setMarketIsLiked] = useState<boolean>(hasLike);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      product.tags.forEach(tagObj => {
        const tag = tagObj.tagName;
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(product);
      });
      return acc;
    },
    {},
  );
  const sortedProductsByTags = Object.entries(productsByTags)
    .sort(([tagA, productsA], [tagB, productsB]) => {
      if (tagA === '추천메뉴') return -1;
      if (tagB === '추천메뉴') return 1;
      return productsA.length - productsB.length;
    })
    .reduce(
      (acc: Record<string, ProductType[]>, [tag, productList]) => {
        acc[tag] = productList;
        return acc;
      },
      {} as Record<string, ProductType[]>,
    );

  const handleCheckout = () => {
    navigation.navigate('Cart', {
      screen: 'Market',
    });
  };

  const scrollToSection = useCallback(
    (tag: string) => {
      if (scrollViewRef.current && sectionOffsets[tag] !== undefined) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: sectionOffsets[tag] + 1,
          animated: true,
        });
      }
    },
    [sectionOffsets],
  );

  const scrollToSidebarTag = useCallback(
    (tag: string) => {
      if (tagScrollViewRef.current && tagWidths[tag] !== undefined) {
        const tagIndex = Object.keys(sortedProductsByTags).indexOf(tag);
        const tagWidth = tagWidths[tag];
        tagScrollViewRef.current.scrollTo({
          x: tagWidth * tagIndex,
          animated: true,
        });
      }
    },
    [sortedProductsByTags, tagWidths],
  );
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    let newSelectedTag = selectedTag;

    const sectionTags = Object.keys(sectionOffsets);
    const lastTag = sectionTags[sectionTags.length - 1];

    sectionTags.forEach(tag => {
      const sectionHeight = sectionHeights[tag] || 0;
      const sectionOffset = sectionOffsets[tag];
      const sectionEndOffset = sectionOffset + sectionHeight;

      if (
        contentOffsetY >= sectionOffset &&
        contentOffsetY < sectionEndOffset
      ) {
        newSelectedTag = tag;
      }
    });

    if (
      newSelectedTag !== lastTag &&
      contentOffsetY >= sectionOffsets[lastTag]
    ) {
      newSelectedTag = lastTag;
    }

    if (newSelectedTag !== selectedTag) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      setSelectedTag(newSelectedTag);
      scrollTimeoutRef.current = setTimeout(() => {
        scrollToSidebarTag(newSelectedTag);
      }, 300);
    }
  };

  const updateSectionOffsets = useCallback(() => {
    const newOffsets: {[key: string]: number} = {};
    let currentOffset = 0;

    Object.keys(sortedProductsByTags).forEach(tag => {
      newOffsets[tag] = currentOffset;
      currentOffset += sectionHeights[tag] || 0;
    });

    setSectionOffsets(newOffsets);
  }, [sortedProductsByTags, sectionHeights]);

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

  const handleTagPress = (tag: string) => {
    setSelectedTag(tag);
    scrollToSection(tag);
  };

  const handleSubscribe = () => {
    setMarketIsLiked(prevState => !prevState);
  };
  const navigatePage = () => {
    if (cart.length === 0) {
      Alert.alert('장바구니가 비어 있습니다.');
      return;
    }
    Alert.alert(
      `장바구니로 이동하시겠습니까?`,
      `취소시 장바구니가 초기화됩니다.`,
      [
        {
          text: '예',
          onPress: () => {
            handleCheckout();
          },
        },
        {
          text: '취소',
          onPress: () => {
            setCart([]);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const caculateRemainingPickupTime = () => {
    const hour = parseInt(Date.now().toString().slice(0, 2));
    const miniute = parseInt(Date.now().toString().slice(2, 4));

    const pickupEndHour = parseInt(pickupEndAt.slice(0, 2));
    const pickupEndMinute = parseInt(pickupEndAt.slice(-2));

    let remainingHour = pickupEndHour - hour;
    let remainingMinute = pickupEndMinute - miniute;

    if (remainingMinute < 0) {
      remainingHour -= 1;
      remainingMinute += 60;
    }

    if (remainingHour < 0) {
      return '픽업 시간이 지났습니다.';
    }
    return `${zeroPad(remainingHour)}시간 ${zeroPad(remainingMinute)}분 남았어요!`;
  };

  return (
    <S.MarketDetailInfoView>
      <S.MarketInfoWrapper>
        <S.MarketMainInfoWrapper>
          <S.MarketDescription>{summary}</S.MarketDescription>
        </S.MarketMainInfoWrapper>
        <S.MarketSideInfoWrapper>
          <S.MarketTimeDescription>
            {caculateRemainingPickupTime()}
          </S.MarketTimeDescription>
          <S.MarketPickupTimeWrapper>
            <S.MarketSideInfo>픽업 가능 시간: </S.MarketSideInfo>
            <S.MarketPickupTime>
              {pickupStartAt.slice(0, 2)}시 {pickupEndAt.slice(-2)}분 -{' '}
              {pickupEndAt.slice(0, 2)}시 {pickupEndAt.slice(-2)}분
            </S.MarketPickupTime>
          </S.MarketPickupTimeWrapper>
          <S.MarketSideInfo>
            {address} {specificAddress}
          </S.MarketSideInfo>
        </S.MarketSideInfoWrapper>
        <S.MarketSubscribeIconWrapper>
          <SubscribeIcon
            marketIsLiked={marketIsLiked}
            marketId={id}
            handleSubscribe={handleSubscribe}
          />
        </S.MarketSubscribeIconWrapper>
      </S.MarketInfoWrapper>
      <S.SideTagBarScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={tagScrollViewRef}>
        {Object.keys(sortedProductsByTags).map(tag => (
          <TouchableOpacity
            key={tag}
            onLayout={handleTagLayout(tag)}
            onPress={() => {
              handleTagPress(tag);
            }}>
            <S.SideBarView selected={selectedTag === tag}>
              <S.SideBarText selected={selectedTag === tag}>
                {tag}
              </S.SideBarText>
            </S.SideBarView>
          </TouchableOpacity>
        ))}
      </S.SideTagBarScrollView>

      <S.MenuScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        onLayout={updateSectionOffsets}
        decelerationRate="fast">
        {Object.entries(sortedProductsByTags).map(([tag, productsByTag]) => (
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

      <BottomButton onPress={navigatePage}>
        예약하기 ({cart.length})
      </BottomButton>
    </S.MarketDetailInfoView>
  );
};

export default MarketDetailPage;
