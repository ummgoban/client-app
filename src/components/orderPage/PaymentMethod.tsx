import React from 'react';
import S from './PaymentMethod.style';

const PaymentMethod = ({children}: {children: React.ReactNode}) => {
  return <S.Card>{children}</S.Card>;
};

export default PaymentMethod;
