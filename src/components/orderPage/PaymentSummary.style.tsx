import styled from '@emotion/native';
<<<<<<< HEAD

const PaymentSummaryContainer = styled.View`
  padding: 16px;

  display: flex;
  flex-direction: column;

  border: 1px solid #b5b5b5;
`;
=======
import C from './Common.style';

const Card = styled(C.CommonCard)``;
const HeaderText = styled(C.HeaderText)``;
>>>>>>> main

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
<<<<<<< HEAD
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;

  color: black;
=======

  margin-bottom: 16px;

  border-bottom-width: 1px;
  border-bottom-color: #b5b5b5;
>>>>>>> main
`;

const PaymentSummaryItemList = styled.View`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const PaymentSummaryItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled.Text<{primary?: boolean}>`
  font-size: 14px;
  line-height: 20px;

  color: ${props => (props.primary ? 'blue' : 'black')};
`;

const S = {
<<<<<<< HEAD
  PaymentSummaryContainer,
  PaymentSummaryItemContainer,
  PaymentSummaryItemList,
  Header,
  HeaderText,
=======
  Card,
  HeaderText,
  PaymentSummaryItemContainer,
  PaymentSummaryItemList,
  Header,
>>>>>>> main
  ItemText,
};

export default S;
