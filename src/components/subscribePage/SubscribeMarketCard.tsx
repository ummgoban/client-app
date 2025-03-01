import React from 'react';
import S from './SubscribeMarketCard.style';
import {Image} from 'react-native';

type SubscribeMarketCardProps = {
  name: string;
  marketId: number;
  address: string;
  specificAddress: string;
  openAt: string;
  closeAt: string;
  thumbnailImage?: string;
  onPress: (marketId: number) => void;
};

const SubscribeMarketCard = ({
  name,
  marketId,
  address,
  specificAddress,
  openAt,
  closeAt,
  thumbnailImage,
  onPress,
}: SubscribeMarketCardProps) => {
  return (
    <S.SubscribeMarketCard onPress={() => onPress(marketId)}>
      <S.ThumbnailImage>
        {thumbnailImage ? (
          <Image
            source={{uri: thumbnailImage}}
            width={64}
            height={64}
            borderRadius={12}
            resizeMode="cover"
          />
        ) : null}
      </S.ThumbnailImage>

      <S.MarketInfo>
        <S.MarketNameText>{name}</S.MarketNameText>
        <S.MarketDescribeText>
          {`가게 주소: ${address} ${specificAddress}`}
        </S.MarketDescribeText>
        <S.MarketDescribeText>{`영업 시간: ${openAt} ~ ${closeAt}`}</S.MarketDescribeText>
      </S.MarketInfo>
    </S.SubscribeMarketCard>
  );
};

export default SubscribeMarketCard;
