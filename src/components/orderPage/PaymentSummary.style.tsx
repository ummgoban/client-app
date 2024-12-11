import styled from '@emotion/native';
import C from './Common.style';

const Card = styled(C.CommonCard)``;
const HeaderText = styled(C.HeaderText)``;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderPaymentMethod = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #b5b5b5;
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
  Card,
  HeaderText,
  PaymentSummaryItemContainer,
  PaymentSummaryItemList,
  Header,
  ItemText,
  HeaderPaymentMethod,
};

export default S;
