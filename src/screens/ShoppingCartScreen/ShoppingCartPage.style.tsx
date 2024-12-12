import styled from '@emotion/native';
import {Card} from 'react-native-paper';

const CartPage = styled.View`
  position: relative;

  flex: 1;
`;

const ScrollView = styled.ScrollView``;

const CardContainer = styled(Card)`
  padding: 16px;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 8px;

  background-color: white;
`;

const S = {
  CartPage,
  CardContainer,
  ScrollView,
};

export default S;
