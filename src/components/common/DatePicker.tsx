import date from '@/utils/date';
import React, {useState} from 'react';
import S from './DatePicker.style';

type Props = {
  onChange: (hour: number, minute: number) => void;
  hour: number;
  minute: number;
  step?: number;
  range?: [number, number];
};

const DatePicker = ({
  onChange,
  hour,
  minute,
  step = 30,
  range = [0, 24],
}: Props) => {
  const [selectedTime, setSelectedTime] = useState({hour, minute});

  const timeRange = Array.from(
    {length: ((range[1] - range[0]) * 60) / step},
    (_, i) => range[0] + (i * step) / 60,
  );

  return (
    <S.ChipContainer>
      {timeRange.map(time => {
        const [h, m] = date.decimalToTime(time);
        return (
          <S.DateChip
            key={time}
            onPress={() => {
              setSelectedTime({hour: h, minute: m});
              onChange(h, m);
            }}
            selected={h === selectedTime.hour && m === selectedTime.minute}
            disabled={date.isAfter(
              new Date(new Date().setHours(h, m, 0, 0)),
            )}>{`${date.zeroPad(h)}:${date.zeroPad(m)}`}</S.DateChip>
        );
      })}
    </S.ChipContainer>
  );
};

export default DatePicker;
