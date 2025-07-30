import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ChevronIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarIcon from 'react-native-vector-icons/Fontisto';

import {useValidateBucket, useAddToBucket} from '@/apis/buckets';

import {BottomButton} from '@/components/common';
import SubscribeIcon from '@/components/common/SubscribeIcon';
import Menu from '@/components/marketDetailPage/Menu';

import {MarketDetailType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BucketProductType} from '@/types/Bucket';
import {ProductType} from '@ummgoban/shared/lib';

import CustomActivityIndicator from '@/components/common/ActivityIndicator';

import {zeroPad} from '@utils/date';

import S from './MarketDetail.style';
import useProfile from '@/hooks/useProfile';
import MarketOpenHourModal from '@/components/marketDetailPage/OpenHoursModal';

type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

const MarketDetailPage = ({
  openAt,
  closeAt,
  address,
  products,
  hasLike,
  id,
  specificAddress,
  summary,
  reviewNum,
  averageRating,
  marketOpenHour,
  // TODO: 디자인 확정 후 페이지 사용 데이터 추가
}: Omit<MarketDetailType, 'images' | 'likeNum' | 'cursorDistance'>) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
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
  const [modalVisible, setModalVisible] = useState(false);
  const [isCartPending, setIsCartPending] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {mutateAsync: validateBucket} = useValidateBucket();
  const {mutateAsync: addToBucket} = useAddToBucket();
  const {profile} = useProfile();

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
      if (product.tags.length === 0) {
        if (!acc['메뉴']) acc['메뉴'] = [];
        acc['메뉴'].push(product);
        return acc;
      }

      product.tags.forEach(tagObj => {
        const tag = tagObj.tagName;
        if (!acc[tag]) acc[tag] = [];
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
    .reduce((acc: Record<string, ProductType[]>, [tag, productList]) => {
      acc[tag] = productList;
      return acc;
    }, {});

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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
    setTagWidths(prevWidths => ({...prevWidths, [tag]: width}));
  };

  const handleLayout = (tag: string) => (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setSectionHeights(prevHeights => ({...prevHeights, [tag]: height}));
    updateSectionOffsets();
  };

  const handleTagPress = (tag: string) => {
    setSelectedTag(tag);
    scrollToSection(tag);
  };

  const handleSubscribe = () => {
    setMarketIsLiked(prev => !prev);
  };

  const handleCheckout = async (marketId: number, cartItems: CartItem[]) => {
    try {
      setIsCartPending(true);
      const bucketProducts: BucketProductType[] = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) throw new Error('상품 정보가 존재하지 않습니다.');
        return {
          count: item.count,
          id: product.id,
          name: product.name,
          image: product.image,
          originPrice: product.originPrice,
          discountPrice: product.discountPrice,
          discountRate: product.discountRate,
        };
      });

      const success = await addToBucket({marketId, products: bucketProducts});
      if (success) {
        navigation.navigate('CartRoot', {screen: 'Cart'});
      } else {
        Alert.alert('재고 초과입니다. 기존 장바구니의 구매수량을 확인해주세요');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCartPending(false);
    }
  };

  const addProductToBucket = async (
    marketId: number,
    addProducts: CartItem[],
  ) => {
    if (addProducts.length === 0) {
      Alert.alert('장바구니가 비어있습니다.');
      return;
    }
    if (!(await validateBucket(marketId))) {
      Alert.alert(
        '기존에 담아두었던 장바구니가 존재합니다.',
        '장바구니에 담으시겠습니까?',
        [
          {
            text: '예',
            onPress: () => {
              handleCheckout(marketId, addProducts);
              setCart([]);
            },
          },
          {
            text: '아니오',
            onPress: () => {
              setCart([]);
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }
    handleCheckout(marketId, addProducts);
    setCart([]);
  };

  const {remainingPickupTime, isMarketClosed} = useMemo(() => {
    const [endHour, endMinute] = closeAt.split(':').map(Number);
    const now = new Date();
    const closeDate = new Date();
    closeDate.setHours(endHour, endMinute, 0, 0);

    const diff = closeDate.getTime() - now.getTime();
    const closed = diff <= 0;

    const diffMinutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return {
      remainingPickupTime: closed
        ? '영업이 종료되었어요.'
        : `영업 종료까지 ${zeroPad(hours)}시간 ${zeroPad(minutes)}분 남았어요!`,
      isMarketClosed: closed,
    };
  }, [closeAt]);

  useEffect(() => {
    const firstTag = Object.keys(sortedProductsByTags)[0];
    if (firstTag) setSelectedTag(prev => prev || firstTag);
  }, [sortedProductsByTags]);

  useEffect(() => {
    setMarketIsLiked(hasLike);
  }, [hasLike]);

  const navigateReviewScreen = () => {
    navigation.navigate('Detail', {
      screen: 'MarketReview',
      params: {marketId: id},
    });
  };

  return (
    <>
      <S.MarketDetailInfoView>
        <S.MarketInfoWrapper>
          <S.MarketMainInfoWrapper>
            <S.MarketDescription>{summary}</S.MarketDescription>
          </S.MarketMainInfoWrapper>
          <S.MarketSideInfoWrapper>
            <S.MarketTimeDescription>
              {remainingPickupTime}
            </S.MarketTimeDescription>
            <S.MarketPickupTimeWrapper>
              <S.MarketPickupTimeRow>
                <S.MarketSideInfo>영업 시간: </S.MarketSideInfo>
                <S.MarketPickupTimeText>{`${openAt} ~ ${closeAt}`}</S.MarketPickupTimeText>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <ChevronIcon name="chevron-right" size={36} color="#495057" />
                </TouchableOpacity>
              </S.MarketPickupTimeRow>
            </S.MarketPickupTimeWrapper>
            <S.MarketSideInfo>
              {address} {specificAddress}
            </S.MarketSideInfo>
          </S.MarketSideInfoWrapper>
          <S.MarketBottomInfo>
            <S.ReviewInfoWrapper>
              {reviewNum !== 0 && averageRating && (
                <>
                  <StarIcon name="star" color="#FFD700" size={24} />
                  <S.ReviewScoreText>
                    {averageRating.toFixed(1)}
                  </S.ReviewScoreText>
                  <S.ReviewTouchableOpacity onPress={navigateReviewScreen}>
                    <S.ReviewCountText>리뷰 {reviewNum}개</S.ReviewCountText>
                    <ChevronIcon
                      name="chevron-right"
                      size={36}
                      color="#495057"
                    />
                  </S.ReviewTouchableOpacity>
                </>
              )}
            </S.ReviewInfoWrapper>
            <SubscribeIcon
              marketIsLiked={marketIsLiked}
              marketId={id}
              handleSubscribe={handleSubscribe}
            />
          </S.MarketBottomInfo>
        </S.MarketInfoWrapper>

        <S.SideTagBarScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={tagScrollViewRef}>
          {Object.keys(sortedProductsByTags).map(tag => (
            <TouchableOpacity
              key={tag}
              onLayout={handleTagLayout(tag)}
              onPress={() => handleTagPress(tag)}>
              <S.SideBarView selected={selectedTag === tag}>
                <S.SideBarText selected={selectedTag === tag}>
                  {tag}
                </S.SideBarText>
              </S.SideBarView>
            </TouchableOpacity>
          ))}
        </S.SideTagBarScrollView>

        <S.MenuWrapper>
          <S.MenuScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            onLayout={updateSectionOffsets}
            decelerationRate="fast">
            {Object.entries(sortedProductsByTags).map(
              ([tag, productsByTag]) => (
                <S.MenuView key={tag} onLayout={handleLayout(tag)}>
                  <S.TagWrapper>
                    <S.MenuText>{tag}</S.MenuText>
                  </S.TagWrapper>
                  {productsByTag.map(product => (
                    <Menu
                      key={product.id}
                      product={product}
                      initCount={
                        cart.find(item => item.productId === product.id)
                          ?.count || 0
                      }
                      onCountChange={handleCountChange}
                    />
                  ))}
                </S.MenuView>
              ),
            )}
          </S.MenuScrollView>
        </S.MenuWrapper>

        <BottomButton
          disabled={isMarketClosed || isCartPending}
          onPress={() => {
            if (profile) {
              addProductToBucket(id, cart);
            } else {
              navigation.navigate('Register', {screen: 'Login'});
            }
          }}>
          {isMarketClosed
            ? '영업이 종료되었어요.'
            : profile
              ? isCartPending
                ? '잠시 기다려주세요.'
                : `예약하기 (${cart.length})`
              : `로그인하고 장바구니에 담기`}
        </BottomButton>

        {isCartPending && <CustomActivityIndicator />}
      </S.MarketDetailInfoView>

      <MarketOpenHourModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        openHours={marketOpenHour}
      />
    </>
  );
};

export default MarketDetailPage;
