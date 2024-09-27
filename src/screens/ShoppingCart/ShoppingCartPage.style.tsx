import styled from '@emotion/native';
import Common from '@/components/CartPage/Common.style';
import {Button as RNPButton} from 'react-native-paper';
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

const ProductImageWrapper = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const ProductInfoWrapper = styled.View`
  flex: 0.7;
  padding-left: 12px;
`;

const ProductImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 8px;
`;

const HeaderText = styled(Common.HeaderText)`
  margin-bottom: 4px;
`;

const DetailText = styled(Common.BodyText)`
  color: #757575;
`;

const PriceText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const Button = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin: 0 8px;
`;

const CountText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const PaymentButtonContainer = styled.View({
  padding: 16,
  backgroundColor: '#fff',
});

const PaymentButton = styled(RNPButton)`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PaymentButtonText = styled.Text({
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
});

const S = {
  CartPage,
  CardContainer,
  ProductImageWrapper,
  ProductInfoWrapper,
  ProductImage,
  HeaderText,
  DetailText,
  PriceText,
  ButtonWrapper,
  Button,
  CountText,
  ScrollView,
  PaymentButtonContainer,
  PaymentButton,
  PaymentButtonText,
};

export default S;
