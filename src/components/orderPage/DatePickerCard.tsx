import React, {useState} from 'react';
import DatePicker from '@components/common/DatePicker';
import Common from './Common';

const DatePickerCard = () => {
  const [reservationTime, setReservationTime] = useState({hour: 0, minute: 0});

  // TODO: fetch marketPickupTime from server
  const marketPickupTime: [number, number] = [18, 22];

  const onChange = (hour: number, minute: number) => {
    console.log(hour, minute);
    setReservationTime({hour, minute});
  };

  return (
    <Common.Card>
      <Common.HeaderText>픽업 시간</Common.HeaderText>
      <DatePicker
        onChange={onChange}
        hour={reservationTime.hour}
        minute={reservationTime.minute}
        range={marketPickupTime}
      />
    </Common.Card>
  );
};

export default DatePickerCard;
