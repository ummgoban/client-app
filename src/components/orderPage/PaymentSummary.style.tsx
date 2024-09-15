import styled from '@emotion/native';

const Header = styled.View`
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
  PaymentSummaryItemContainer,
  PaymentSummaryItemList,
  Header,
  ItemText,
};

export default S;
