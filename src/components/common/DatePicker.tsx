import React from 'react';

import {
  DatePickerProps,
  default as RNDatePicker,
} from 'react-native-date-picker';

type Props = {} & DatePickerProps;

const DatePicker = (props: Props) => {
  const {date, confirmText, cancelText, ...rest} = props;
  return (
    <RNDatePicker
      {...rest}
      modal
      mode="time"
      date={date ?? new Date()}
      confirmText={confirmText ?? '확인'}
      cancelText={cancelText ?? '취소'}
    />
  );
};

export default DatePicker;
