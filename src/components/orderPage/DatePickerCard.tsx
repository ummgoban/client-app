import React, {useState} from 'react';
import {Icon} from 'react-native-paper';

import {DatePicker} from '@components/common';
import {format} from '@/utils/date';

import S from './DatePickerCard.style';

const DatePickerCard = ({
  pickupReservedAt,
  onChange,
  minimumDate,
  maximumDate,
}: {
  pickupReservedAt: Date;
  onChange: (date: Date) => void;
  minimumDate: Date;
  maximumDate: Date;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onConfirm = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <>
      <S.Card>
        <S.DatePickerButton onPress={() => setIsOpen(true)}>
          <S.DatePickerText>
            {format(pickupReservedAt, 'a HH : mm')}
          </S.DatePickerText>
          <Icon source={'menu-down'} size={24} />
        </S.DatePickerButton>
        <S.PlaneText>{'으로 픽업 예약을 확정할게요'}</S.PlaneText>
        <S.PickupAbleTextContainer>
          <S.PickupAbleText>
            {`* 픽업 가능 시간: ${format(minimumDate, 'HH:mm')} ~ ${format(maximumDate, 'HH:mm')}`}
          </S.PickupAbleText>
        </S.PickupAbleTextContainer>
      </S.Card>
      <DatePicker
        title={'예약 시간을 선택해주세요'}
        open={isOpen}
        mode="time"
        locale="ko"
        date={pickupReservedAt}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={date => {
          onConfirm(date);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default DatePickerCard;
