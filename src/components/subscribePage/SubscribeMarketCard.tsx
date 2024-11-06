import React from 'react';
import S from './SubscribeMarketCard.style';

type SubscribeMarketCardProps = {
  name: string;
  marketid: number;
  address: string;
  specificAddress: string;
  openAt: string;
  closeAt: string;
  thumbnailImage: string;
  onPress: (marketId: number) => void;
};

const SubscribeMarketCard = ({
  name,
  marketid,
  address,
  specificAddress,
  openAt,
  closeAt,
  thumbnailImage,
  onPress,
}: SubscribeMarketCardProps) => {
  return (
    <S.SubscribeMarketCard onPress={() => onPress(marketid)}>
      <S.thumbnailImage source={{uri: thumbnailImage}} />
      <S.MarketInfo>
        <S.MarketNameText>{name}</S.MarketNameText>
        <S.MarketDescribeText>
          가게 주소: {address} {specificAddress}
        </S.MarketDescribeText>
        <S.MarketDescribeText>여는 시간: {openAt}</S.MarketDescribeText>
        <S.MarketDescribeText>닫는 시간: {closeAt}</S.MarketDescribeText>
      </S.MarketInfo>
    </S.SubscribeMarketCard>
  );
};

export default SubscribeMarketCard;
