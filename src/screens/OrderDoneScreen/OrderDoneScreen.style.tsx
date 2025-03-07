import styled from '@emotion/native';
import {Card} from 'react-native-paper';

const OrderDoneContainer = styled.View`
  display: flex;
  flex-direction: column;

  background-color: white;
  width: 100%;
  height: 100%;
`;

const OrderDoneCard = styled(Card)`
  padding: 16px;
  margin: 8px;

  display: flex;
  flex-direction: column;

  background-color: white;
`;

const ProductItem = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const PriceView = styled.View`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const PriceItem = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const PrimaryText = styled.Text`
  ${({theme}) => theme.fonts.body1};
  font-weight: bold;

  padding: 8px 0;
`;

const S = {
  OrderDoneContainer,
  OrderDoneCard,
  ProductItem,
  PriceView,
  PriceItem,
  PrimaryText,
};

export default S;
