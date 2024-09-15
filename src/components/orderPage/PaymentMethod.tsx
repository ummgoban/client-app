import React from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import S from './PaymentMethod.style';
import Common from './Common';

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
    <Common.Card>
      <Common.HeaderText>결제수단</Common.HeaderText>
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
    </Common.Card>
  );
};

export default PaymentMethod;
