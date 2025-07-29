import React, {useMemo} from 'react';
import {FlatList, Pressable} from 'react-native';
import DotIndicator from '@/assets/icons/dot.svg';
import {MarketType} from '@/types/Market';
import S from './Market.style';

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
        <S.Row>
          <S.MarketTitle>{name}</S.MarketTitle>
          <S.LightText>{cursorDistance}km</S.LightText>
        </S.Row>
        <S.DescriptionContainer>
          <S.MarketPickupTime>
            <S.LightText>{'영업'}</S.LightText>
            <S.DarkText>{`${openAt}~${closeAt}`}</S.DarkText>
          </S.MarketPickupTime>
          <DotIndicator width={2} height={2} color="rgba(174, 174, 174, 1)" />
          {/* TODO: 주소 대신 현재 위치에서 거리 표시 (600m dot 도보 4분) 형태 */}
          <S.DarkText>
            {address} {specificAddress}
          </S.DarkText>
        </S.DescriptionContainer>
      </S.MarketInfoDiscription>
    </S.MarketWrapper>
  );
};

export default Market;
