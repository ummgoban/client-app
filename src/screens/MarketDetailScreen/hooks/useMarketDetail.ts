import {useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {ProductType} from '@ummgoban/shared/lib';
import {MarketDetailType} from '@/types/Market';

export const useMarketDetail = (
  marketDetail: Omit<MarketDetailType, 'images' | 'likeNum' | 'cursorDistance'>,
) => {
  const {id, products, hasLike, openAt, closeAt} = marketDetail;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [marketIsLiked, setMarketIsLiked] = useState<boolean>(hasLike);
  const [modalVisible, setModalVisible] = useState(false);

  // 영업 종료 여부 계산
  const isMarketClosed = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [openHour, openMinute] = openAt.split(':').map(Number);
    const [closeHour, closeMinute] = closeAt.split(':').map(Number);

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    return currentTime < openTime || currentTime > closeTime;
  }, [openAt, closeAt]);

  // 상품을 태그별로 분류
  const productsByTags = useMemo(() => {
    return products.reduce((acc: {[key: string]: ProductType[]}, product) => {
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
    }, {});
  }, [products]);

  // 태그별로 정렬된 상품 목록
  const sortedProductsByTags = useMemo(() => {
    return Object.entries(productsByTags)
      .sort(([tagA, productsA], [tagB, productsB]) => {
        if (tagA === '추천메뉴') return -1;
        if (tagB === '추천메뉴') return 1;
        return productsA.length - productsB.length;
      })
      .reduce(
        (acc, [tag, tagProducts]) => {
          acc[tag] = tagProducts;
          return acc;
        },
        {} as {[key: string]: ProductType[]},
      );
  }, [productsByTags]);

  const handleSubscribe = () => {
    setMarketIsLiked(prev => !prev);
  };

  const navigateReviewScreen = () => {
    navigation.navigate('Detail', {
      screen: 'MarketReview',
      params: {marketId: id},
    });
  };

  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };

  return {
    marketIsLiked,
    modalVisible,
    isMarketClosed,
    sortedProductsByTags,
    handleSubscribe,
    navigateReviewScreen,
    toggleModal,
    setModalVisible,
  };
};
