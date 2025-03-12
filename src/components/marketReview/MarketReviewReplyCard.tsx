import React from 'react';
import ArrowIcon from 'react-native-vector-icons/Feather';
import S from './MarketReviewReplyCard.style';
import theme from '@/context/theme';
import {format} from '@/utils/date';

type MarketReviewReplyCardProps = {
  reviewReplyId: number;
  createAt: string;
  content: string;
};

const MarketReviewReplyCard = ({
  // reviewReplyId,
  createAt,
  content,
}: MarketReviewReplyCardProps) => {
  return (
    <S.Container>
      <ArrowIcon
        color={theme.colors.tertiaryDisabled}
        name="corner-down-right"
        size={20}
      />
      <S.OwnerReplyContainer>
        <S.ReviewReplyHeader>
          <S.OwnerText>사장님</S.OwnerText>
          <S.ReviewReplyCreatedAtText>
            {format(createAt, 'YYYY년 M월 D일')}
          </S.ReviewReplyCreatedAtText>
        </S.ReviewReplyHeader>
        <S.ReviewReplyBody>{content}</S.ReviewReplyBody>
      </S.OwnerReplyContainer>
    </S.Container>
  );
};

export default MarketReviewReplyCard;
