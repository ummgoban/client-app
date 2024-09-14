import React, {useState} from 'react';
import {Card, RadioButton} from 'react-native-paper';

const paymentMethodKind = ['toss', 'kakao'] as const;

type PaymentMethodKind = (typeof paymentMethodKind)[number];

const PaymentMethod = () => {
  const [method, setMethod] = useState<PaymentMethodKind>('toss');

  return (
    <Card>
      <Card.Title title="결제 수단" />
      <Card.Content>
        <RadioButton.Group
          onValueChange={value => setMethod(value as PaymentMethodKind)}
          value={method}>
          <RadioButton.Item label="토스" value="toss" />
        </RadioButton.Group>
      </Card.Content>
    </Card>
  );
};

export default PaymentMethod;
