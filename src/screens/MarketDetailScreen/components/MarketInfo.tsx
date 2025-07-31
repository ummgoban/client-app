import React from 'react';
import {TouchableOpacity} from 'react-native';
import StarIcon from 'react-native-vector-icons/Fontisto';
import ChevronIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import SubscribeIcon from '@/components/common/SubscribeIcon';
import {MarketDetailType} from '@/types/Market';

import S from '../MarketDetail.style';

type MarketInfoProps = {
  marketDetail: Omit<
    MarketDetailType,
    'images' | 'likeNum' | 'cursorDistance' | 'products'
  >;
  marketIsLiked: boolean;
  handleSubscribe: () => void;
  navigateReviewScreen: () => void;
  toggleModal: () => void;
};

const MarketInfo = ({
  marketDetail,
  marketIsLiked,
  handleSubscribe,
  navigateReviewScreen,
  toggleModal,
}: MarketInfoProps) => {
  const {
    id,
    openAt,
    closeAt,
    address,
    specificAddress,
    summary,
    reviewNum,
    averageRating,
  } = marketDetail;

  return (
    <S.MarketInfoWrapper>
      <S.MarketMainInfoWrapper>
        <S.MarketDescription>{summary}</S.MarketDescription>
      </S.MarketMainInfoWrapper>
      <S.MarketSideInfoWrapper>
        <S.MarketPickupTimeWrapper>
          <S.MarketPickupTimeRow>
            <S.MarketSideInfo>영업 시간: </S.MarketSideInfo>
            <S.MarketPickupTimeText>{`${openAt} ~ ${closeAt}`}</S.MarketPickupTimeText>
            <TouchableOpacity onPress={() => toggleModal()}>
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
              <S.ReviewScoreText>{averageRating.toFixed(1)}</S.ReviewScoreText>
              <S.ReviewTouchableOpacity onPress={navigateReviewScreen}>
                <S.ReviewCountText>리뷰 {reviewNum}개</S.ReviewCountText>
                <ChevronIcon name="chevron-right" size={36} color="#495057" />
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
  );
};

export default MarketInfo;
