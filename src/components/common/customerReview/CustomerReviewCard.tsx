import {CustomerReviewInfo} from '@/types/Review';
import React from 'react';
import StarIcon from 'react-native-vector-icons/Fontisto';
import CustomImageModal from '../CustomImageModal';
import {format} from '@/utils/date';
import MarketReviewReplyCard from '@/components/marketReview/MarketReviewReplyCard';
import S from './CustomerReviewCard.style';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@/context/theme';

type CustomerReviewCardProps = {
  review: CustomerReviewInfo;
  onPress: (marketId: number) => void;
};

const CustomerReviewCard = ({review, onPress}: CustomerReviewCardProps) => {
  const {
    id,
    marketId,
    marketName,
    content,
    rating,
    products,
    createdAt,
    imageUrls,
    reviewReplies,
  } = review;
  return (
    <S.Container>
      <S.ReviewHeaderWrapper>
        <S.ReviewHeaderLeft>
          <S.ReviewLeftToMarket
            onPress={() => {
              onPress(marketId);
            }}>
            <S.CustomerNameText>{marketName}</S.CustomerNameText>
            <Icon name="right" size={16} color={theme.colors.tertiary} />
          </S.ReviewLeftToMarket>
          <S.ReviewRating>
            {Array.from({length: rating}).map((_, index) => (
              <StarIcon key={index} name="star" color="#FFD700" size={12} />
            ))}
          </S.ReviewRating>
        </S.ReviewHeaderLeft>
        <S.ReviewCreatedText>
          {format(createdAt, 'YYYY년 M월 D일')}
        </S.ReviewCreatedText>
      </S.ReviewHeaderWrapper>
      <S.CustomerReviewText>{content}</S.CustomerReviewText>
      <S.ImagesContainer
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {imageUrls &&
          imageUrls.length > 0 &&
          imageUrls.map(url => (
            <S.ImageWrapper key={url}>
              <CustomImageModal
                uri={url}
                height={120}
                width={120}
                borderRadius={8}
              />
            </S.ImageWrapper>
          ))}
      </S.ImagesContainer>
      {products.map(product => (
        <S.OrderInfoWrapper key={`${id}-${product}`}>
          <S.OrderInfoTextWrapper>
            <S.OrderInfoText>{product}</S.OrderInfoText>
          </S.OrderInfoTextWrapper>
        </S.OrderInfoWrapper>
      ))}
      {reviewReplies && (
        <MarketReviewReplyCard
          reviewReplyId={reviewReplies.reviewReplyId}
          createAt={reviewReplies.createAt}
          content={reviewReplies.content}
        />
      )}
    </S.Container>
  );
};

export default CustomerReviewCard;
