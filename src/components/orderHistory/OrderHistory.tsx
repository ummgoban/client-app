import {OrderType} from '@/types/OrderType';
import {format} from '@/utils/date';
import React from 'react';
import {Image} from 'react-native';
import HistoryTimeline from './HistoryTimeline';

import S from './OrderHistory.style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';

const DESCRIPTION_MAX_LENGTH = 30;

type Props = {
  historyList: OrderType[] | null;
  onPressMarket: (marketId: number) => void;
};

const OrderHistory = ({historyList, onPressMarket}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'OrderHistory'>>();
  return (
    <S.OrderContainer>
      <S.HistoryList>
        {historyList === null
          ? Array.from({length: 3}).map((_, idx) => (
              <S.HistoryItemSkeleton key={idx} />
            ))
          : historyList.map(order => {
              const representProduct = (name => {
                if (name.length > DESCRIPTION_MAX_LENGTH) {
                  const lastIndexOfSpace = name.lastIndexOf(
                    ' ',
                    DESCRIPTION_MAX_LENGTH,
                  );

                  return `${name.slice(
                    0,
                    lastIndexOfSpace > 0
                      ? lastIndexOfSpace
                      : DESCRIPTION_MAX_LENGTH,
                  )}...`;
                }
                return name;
              })(order.products[0].name);

              const productLength = order.products.length;

              const description = `${representProduct} ${
                productLength > 1
                  ? `외 ${productLength - 1}개`
                  : `${order.products[0].count}개`
              } ${order.ordersPrice.toLocaleString()}원`;

              const status =
                order.ordersStatus === 'ORDERED' ||
                order.ordersStatus === 'ACCEPTED'
                  ? '예약완료'
                  : order.ordersStatus === 'PICKEDUP'
                    ? '픽업완료'
                    : order.ordersStatus === 'CANCELED'
                      ? '주문취소'
                      : null; // not reachable

              return (
                <S.HistoryItem key={order.ordersId}>
                  <S.HistoryItemSummary>
                    <S.StoreImage
                      source={{uri: order.products[0].image}}
                      width={64}
                      height={64}
                    />
                    <S.ItemInfo>
                      <S.InfoHeader>
                        <S.TouchableStoreName
                          onPress={() => onPressMarket(order.marketId)}>
                          <S.StoreName numberOfLines={1}>
                            {order.marketName}
                          </S.StoreName>
                          <Image
                            source={{
                              // TODO: replace with chevron-right icon
                              uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/chevron-right-1667908-2039431.png?f=webp&w=256',
                            }}
                            width={24}
                            height={24}
                          />
                        </S.TouchableStoreName>
                        {order.ordersStatus === 'PICKEDUP' && !order.review && (
                          <S.ReviewCreateButtonContainer>
                            <S.ReviewCreateButton
                              onPress={() =>
                                navigation.navigate('Detail', {
                                  screen: 'Review',
                                  params: {
                                    orderId: order.ordersId,
                                    marketName: order.marketName,
                                    reviewContents: order.products,
                                  },
                                })
                              }>
                              <S.ReviewCreateButtonText>
                                리뷰 작성
                              </S.ReviewCreateButtonText>
                            </S.ReviewCreateButton>
                          </S.ReviewCreateButtonContainer>
                        )}
                        <S.OrderDetailButtonContainer>
                          <S.OrderDetailButton
                            onPress={() =>
                              navigation.navigate('Detail', {
                                screen: 'OrderDetail',
                                params: {
                                  marketId: order.marketId,
                                  marketName: order.marketName,
                                  ordersId: order.ordersId,
                                },
                              })
                            }>
                            <S.OrderDetailButtonText>
                              주문 상세
                            </S.OrderDetailButtonText>
                          </S.OrderDetailButton>
                        </S.OrderDetailButtonContainer>
                      </S.InfoHeader>
                      <S.CreatedAt>{`${format(order.createdAt)}${
                        status != null ? ` · ${status}` : ''
                      }`}</S.CreatedAt>
                      <S.Description numberOfLines={2}>
                        {description}
                      </S.Description>
                    </S.ItemInfo>
                  </S.HistoryItemSummary>
                  <S.HistoryTimelineContainer>
                    <HistoryTimeline
                      title="픽업 대기"
                      timestamp={order.pickupReservedAt}
                      description={`${format(
                        order.pickupReservedAt,
                        'YYYY.MM.DD HH시 mm분',
                      )}까지 가게로 방문해주세요.`}
                    />
                    {/* TODO: 픽업 완료 시간 추가 */}
                    {order.ordersStatus === 'PICKEDUP' && (
                      <HistoryTimeline
                        title="픽업 완료"
                        timestamp={order.pickupReservedAt + 1000 * 60}
                        description={'픽업이 완료되었습니다.'}
                      />
                    )}
                    {/* TODO: 주문 취소 시간 추가 */}
                    {order.ordersStatus === 'CANCELED' && (
                      <HistoryTimeline
                        title="주문 취소"
                        timestamp={order.pickupReservedAt + 1000 * 60}
                        description={'주문이 취소되었습니다.'}
                      />
                    )}
                  </S.HistoryTimelineContainer>
                </S.HistoryItem>
              );
            })}
      </S.HistoryList>
    </S.OrderContainer>
  );
};

export default OrderHistory;
