import {ReviewInfo} from '@/types/Review';
import React from 'react';
import StarIcon from 'react-native-vector-icons/Fontisto';
import S from './MarketReviewCard.style';
import CustomImageModal from '../common/CustomImageModal';
import {format} from '@/utils/date';

type MarketReviewCardProps = {
  review: ReviewInfo;
};

const MarketReviewCard = ({review}: MarketReviewCardProps) => {
  const {
    id,
    name,
    content,
    rating,
    products,
    createdAt,
    imageUrls,
    // reviewReplies,
  } = review;
  return (
    <S.Container>
      <S.ReviewHeaderWrapper>
        <S.ReviewHeaderLeft>
          <S.CustomerNameText>{name}님</S.CustomerNameText>
          {Array.from({length: rating}).map((_, index) => (
            <StarIcon key={index} name="star" color="#FFD700" size={12} />
          ))}
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
    </S.Container>
  );
};

export default MarketReviewCard;
