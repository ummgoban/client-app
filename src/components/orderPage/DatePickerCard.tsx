import React, {useState} from 'react';
import {DatePicker} from '@components/common';
import Common from './Common';

const DatePickerCard = () => {
  const [reservedAt, setReservedAt] = useState({hour: 0, minute: 0});

  // TODO: fetch marketPickupTime from server
  const marketPickupAt: [number, number] = [18, 22];

  const onChange = (hour: number, minute: number) => {
    setReservedAt({hour, minute});
  };

  return (
    <Common.Card>
      <Common.HeaderText>픽업 시간</Common.HeaderText>
      <DatePicker
        onChange={onChange}
        hour={reservedAt.hour}
        minute={reservedAt.minute}
        range={marketPickupAt}
      />
    </Common.Card>
  );
};

export default DatePickerCard;
