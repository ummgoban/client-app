import styled from '@emotion/native';
const CartPage = styled.View`
  flex: 1;
  margin: 0 16px;
`;
const ScrollView = styled.ScrollView``;
const CardContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 8px 0;
  background-color: white;
`;

const S = {
  CartPage,
  CardContainer,
  ScrollView,
};

export default S;
