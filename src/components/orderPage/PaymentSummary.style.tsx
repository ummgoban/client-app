import styled from '@emotion/native';

const PaymentSummaryContainer = styled.View`
  padding: 16px;

  display: flex;
  flex-direction: column;

  border: 1px solid #b5b5b5;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  line-height: 34px;
  font-weight: 600;

  color: black;
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
