import React, {useState} from 'react';
import {DatePicker} from '@components/common';
import S from './DatePickerCard.style';

const DatePickerCard = () => {
  const [reservedAt, setReservedAt] = useState({hour: 0, minute: 0});

  // TODO: fetch marketPickupTime from server
  const marketPickupAt: [number, number] = [18, 22];

  const onChange = (hour: number, minute: number) => {
    setReservedAt({hour, minute});
  };

  return (
    <S.Card>
      <S.HeaderText>픽업 시간</S.HeaderText>
      <DatePicker
        onChange={onChange}
        hour={reservedAt.hour}
        minute={reservedAt.minute}
        range={marketPickupAt}
      />
    </S.Card>
  );
};

export default DatePickerCard;
