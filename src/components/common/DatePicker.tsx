import React from 'react';

import {
  DatePickerProps,
  default as RNDatePicker,
} from 'react-native-date-picker';

type Props = {} & DatePickerProps;

const DatePicker = (props: Props) => {
  return (
    <RNDatePicker
      {...props}
      modal
      mode="time"
      date={props.date ?? new Date()}
      confirmText={props.confirmText ?? '확인'}
      cancelText={props.cancelText ?? '취소'}
    />
  );
};

export default DatePicker;
