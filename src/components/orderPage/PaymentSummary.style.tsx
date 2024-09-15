import styled from '@emotion/native';
import {Card} from 'react-native-paper';

const PaymentSummaryContainer = styled(Card)`
  padding: 16px;
  margin: 8px;

  display: flex;
  flex-direction: column;

  background-color: white;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 16px;

  border-bottom-width: 1px;
  border-bottom-color: #b5b5b5;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: black;

  padding-bottom: 16px;
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
  PaymentSummaryContainer,
  PaymentSummaryItemContainer,
  PaymentSummaryItemList,
  Header,
  HeaderText,
  ItemText,
};

export default S;
