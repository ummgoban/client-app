import React, {useState} from 'react';
import {Icon} from 'react-native-paper';

import {DatePicker} from '@components/common';
import {format} from '@/utils/date';

import S from './DatePickerCard.style';

const DatePickerCard = ({
  pickupReservedAt,
  onChange,
}: {
  pickupReservedAt: Date;
  onChange: (date: Date) => void;
}) => {
  const now = new Date();

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
            {format(pickupReservedAt.getTime(), 'a HH : mm')}
          </S.DatePickerText>
          <Icon source={'menu-down'} size={24} />
        </S.DatePickerButton>
        <S.PlaneText>{'으로 픽업 예약을 확정할게요'}</S.PlaneText>
      </S.Card>
      <DatePicker
        title={'예약 시간을 선택해주세요'}
        open={isOpen}
        mode="time"
        date={pickupReservedAt}
        minimumDate={now}
        // TODO: 예약 가능 시간 서버에서 받아와야 함
        maximumDate={new Date(now.getTime() + 24 * 60 * 60 * 1000)}
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
