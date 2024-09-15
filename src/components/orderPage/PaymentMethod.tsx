import React from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import S from './PaymentMethod.style';

const PaymentMethod = <T extends string>({
  value,
  onChange,
  paymentMethodKind,
}: {
  value: T;
  onChange: (method: T) => void;
  paymentMethodKind: {
    [key in T]: string;
  };
}) => {
  return (
    <S.PaymentMethodContainer>
      <S.HeaderText>결제수단</S.HeaderText>
      <View>
        <RadioButton.Group
          onValueChange={newValue => onChange(newValue as T)}
          value={value}>
          {Object.entries<string>(paymentMethodKind).map(([kind, label]) => (
            <S.PaymentRadioButtonItem
              key={kind}
              value={kind}
              label={label}
              mode="android"
            />
          ))}
        </RadioButton.Group>
      </View>
    </S.PaymentMethodContainer>
  );
};

export default PaymentMethod;
