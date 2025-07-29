import React, {useMemo} from 'react';
import {FlatList, Pressable} from 'react-native';
import DotIndicator from '@/assets/icons/dot.svg';
import {MarketType} from '@/types/Market';
import S from './Market.style';
import StarIcon from 'react-native-vector-icons/Fontisto';
import HeartIcon from 'react-native-vector-icons/Entypo';
import {floor} from '@/utils/math';

type Props = {
  market: MarketType;
  onPress: (marketId: number) => void;
};

const Market = ({market, onPress}: Props) => {
  const {
    id,
    name,
    openAt,
    closeAt,
    address,
    specificAddress,
    reviewNum,
    likeNum,
    summary,
    cursorDistance,
    averageRating,
  } = market;
  const productData = useMemo(
    () => market.products.filter(p => p.productStatus !== 'HIDDEN'),
    [market.products],
  );

  return (
    <S.MarketWrapper onPress={() => onPress(id)}>
      <FlatList
        horizontal
        data={productData}
        removeClippedSubviews={false}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={productData.length > 2}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingRight: 4}}
        renderItem={({item}) => (
          <Pressable onPress={() => onPress(id)}>
            <S.MarketImageBox>
              <S.MarketImage source={{uri: item.image}} />
              <S.MenuGradation
                colors={[
                  'rgba(0, 0, 0, 0.6)',
                  'rgba(0, 0, 0, 0.3)',
                  'rgba(0, 0, 0, 0)',
                ]}
                locations={[0, 0.3, 0.7]}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
              />
              <S.LableWrapper>
                <S.MenuLabel numberOfLines={1}>{item.name}</S.MenuLabel>
                <S.PriceLabel>
                  {item.discountPrice.toLocaleString()}원
                </S.PriceLabel>
              </S.LableWrapper>
            </S.MarketImageBox>
          </Pressable>
        )}
      />
      <S.MarketInfoDiscription>
        <S.Row gap={8}>
          <S.MarketTitle>{name}</S.MarketTitle>
          <S.LightText>{floor(cursorDistance, 1)}km</S.LightText>

          {reviewNum > 0 && (
            <S.Row gap={4}>
              <StarIcon name="star" color="#8d96a9" size={12} />
              <S.LightText>
                {floor(averageRating, 1)}({reviewNum})
              </S.LightText>
            </S.Row>
          )}

          {likeNum > 0 && (
            <S.Row>
              <HeartIcon name="heart" color="#8d96a9" size={16} />
              <S.LightText>{likeNum}</S.LightText>
            </S.Row>
          )}
        </S.Row>
        <S.DescriptionContainer>
          <S.MarketPickupTime>
            <S.LightText>{'영업'}</S.LightText>
            <S.DarkText>{`${openAt}~${closeAt}`}</S.DarkText>
          </S.MarketPickupTime>
          <DotIndicator width={2} height={2} color="rgba(174, 174, 174, 1)" />
          <S.DarkText>
            {address} {specificAddress}
          </S.DarkText>
        </S.DescriptionContainer>
        <S.DarkText>{summary}</S.DarkText>
      </S.MarketInfoDiscription>
    </S.MarketWrapper>
  );
};

export default Market;
