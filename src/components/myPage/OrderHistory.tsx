import React from 'react';
import {Alert} from 'react-native';
import {OrderType} from '../../types/OrderType';
import {format} from '../../utils/date';
import HistoryTimeline from './HistoryTimeline';
import S from './OrderHistory.style';

const DESCRIPTION_MAX_LENGTH = 30;

const OrderHistory = ({historyList}: {historyList: OrderType[]}) => {
  return (
    <S.OrderContainer>
      <S.Title>진행중인 주문</S.Title>
      <S.HistoryList>
        {historyList.map(order => {
          const representProduct = (name => {
            if (name.length > DESCRIPTION_MAX_LENGTH) {
              const lastIndexOfSpace = name.lastIndexOf(
                ' ',
                DESCRIPTION_MAX_LENGTH,
              );

              if (lastIndexOfSpace > 0) {
                return `${name.slice(
                  0,
                  name.lastIndexOf(' ', DESCRIPTION_MAX_LENGTH),
                )}...`;
              }

              return `${name.slice(0, DESCRIPTION_MAX_LENGTH)}...`;
            }
            return name;
          })(order.product[0].name);

          const productLength = order.product.length;

          const sumOfPrice = order.product
            .reduce((acc, curr) => acc + curr.price, 0)
            .toLocaleString();

          const description = `${representProduct} ${
            productLength > 1
              ? `외 ${productLength - 1}개`
              : `${order.product[0].count}개`
          } ${sumOfPrice}원`;

          const status =
            order.status === 'ORDERED'
              ? '예약완료'
              : order.status === 'PENDING'
              ? '픽업대기'
              : order.status === 'DONE'
              ? '픽업완료'
              : order.status === 'CANCEL'
              ? '주문취소'
              : null; // not reachable

          return (
            <S.HistoryItem key={order.id}>
              <S.HistoryItemSummary>
                <S.StoreImage
                  source={{uri: order.store.image}}
                  width={64}
                  height={64}
                />
                <S.ItemInfo>
                  <S.InfoHeader>
                    <S.StoreName numberOfLines={1}>
                      {order.store.name}
                    </S.StoreName>
                    <S.OrderDetailButtonContainer>
                      <S.OrderDetailButton
                        onPress={() => Alert.alert('주문 상세 바로가기')}>
                        <S.OrderDetailButtonText>
                          주문 상세
                        </S.OrderDetailButtonText>
                      </S.OrderDetailButton>
                    </S.OrderDetailButtonContainer>
                  </S.InfoHeader>
                  <S.CreatedAt>{`${format(order.createdAt)}${
                    status != null ? ` · ${status}` : ''
                  }`}</S.CreatedAt>
                  <S.Description numberOfLines={2}>{description}</S.Description>
                </S.ItemInfo>
              </S.HistoryItemSummary>
              <S.HistoryTimelineContainer>
                <HistoryTimeline
                  title="예약 접수"
                  timestamp={order.createdAt}
                  description={
                    order.pendingAt == null
                      ? '픽업 예약이 완료되었습니다.'
                      : null
                  }
                />
                {order.pendingAt != null && (
                  <HistoryTimeline
                    title="픽업 대기"
                    timestamp={order.pendingAt}
                    description={
                      order.doneAt == null
                        ? `${format(
                            order.pickupAt,
                            'HH시 mm분',
                          )}까지 가게로 방문해주세요.`
                        : null
                    }
                  />
                )}
                {order.doneAt != null && (
                  <HistoryTimeline
                    title="픽업 완료"
                    timestamp={order.doneAt}
                    description={`${format(
                      order.doneAt,
                      'HH시 mm분',
                    )}에 픽업이 완료되었습니다.`}
                    dashline={false}
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
