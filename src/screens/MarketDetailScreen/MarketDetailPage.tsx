import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '@/types/StackNavigationType';
import {MarketDetailType} from '@/types/Market';
import useProfile from '@/hooks/useProfile';
import MarketOpenHourModal from '@/components/marketDetailPage/OpenHoursModal';

import S from './MarketDetail.style';
import {useCart, useScroll, useMarketDetail} from './hooks';
import {MarketInfo, ProductList, CartButton} from './components';
import {routeToDetail} from '@/navigation/navigator';

const MarketDetailPage = ({
  name,
  hasLike,
  openAt,
  closeAt,
  marketOpenHour,
  address,
  products,
  id,
  specificAddress,
  summary,
  latitude,
  longitude,
  averageRating,
  reviewNum,
}: Omit<MarketDetailType, 'images' | 'likeNum' | 'cursorDistance'>) => {
  ////////////////////////////
  //    웹뷰로 모두 대체    //
  ////////////////////////////

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    routeToDetail(navigation, id);
  }, [navigation, id]);

  const {profile} = useProfile();

  // 커스텀 훅 사용
  const marketDetailProps: Omit<
    MarketDetailType,
    'images' | 'likeNum' | 'cursorDistance'
  > = {
    name,
    hasLike,
    openAt,
    closeAt,
    marketOpenHour,
    address,
    products,
    id,
    specificAddress,
    latitude,
    longitude,
    summary,
    averageRating,
    reviewNum,
  };

  const {
    marketIsLiked,
    modalVisible,
    isMarketClosed,
    sortedProductsByTags,
    handleSubscribe,
    navigateReviewScreen,
    toggleModal,
    setModalVisible,
  } = useMarketDetail(marketDetailProps);

  const {cart, isCartPending, handleCountChange, addProductToBucket} =
    useCart(products);

  const {
    selectedTag,
    scrollViewRef,
    tagScrollViewRef,
    handleScroll,
    handleTagLayout,
    handleLayout,
    handleTagPress,
    updateSectionOffsets,
  } = useScroll();

  // 장바구니 버튼 클릭 핸들러
  const handleCartButtonPress = () => {
    if (profile) {
      addProductToBucket(id, cart);
    } else {
      navigation.navigate('Register', {screen: 'Login'});
    }
  };

  return (
    <>
      <S.MarketDetailInfoView>
        {/* 마켓 정보 컴포넌트 */}
        <MarketInfo
          marketDetail={marketDetailProps}
          marketIsLiked={marketIsLiked}
          handleSubscribe={handleSubscribe}
          navigateReviewScreen={navigateReviewScreen}
          toggleModal={toggleModal}
        />

        {/* 상품 목록 컴포넌트 */}
        <ProductList
          sortedProductsByTags={sortedProductsByTags}
          selectedTag={selectedTag}
          cart={cart}
          handleCountChange={handleCountChange}
          handleTagPress={handleTagPress}
          handleTagLayout={handleTagLayout}
          handleLayout={handleLayout}
          handleScroll={handleScroll}
          scrollViewRef={scrollViewRef}
          tagScrollViewRef={tagScrollViewRef}
          updateSectionOffsets={updateSectionOffsets}
        />

        {/* 장바구니 버튼 컴포넌트 */}
        <CartButton
          isMarketClosed={isMarketClosed}
          isCartPending={isCartPending}
          cart={cart}
          profile={profile}
          onPress={handleCartButtonPress}
        />
      </S.MarketDetailInfoView>

      {/* 영업시간 모달 */}
      <MarketOpenHourModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        openHours={marketOpenHour}
      />
    </>
  );
};

export default MarketDetailPage;
