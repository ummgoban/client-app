import styled from '@emotion/native';

const Container = styled.View`
  display: flex;
  margin: 32px 16px;
  gap: 16px;
  background-color: white;
`;
const TextRowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const PaymentInfoText = styled.Text`
  ${({theme}) => theme.fonts.body1};
  color: ${props => props.theme.colors.tertiary};
  font-weight: 700;
`;
const ProductDescription = styled.Text`
  ${({theme}) => theme.fonts.body2};
  color: ${props => props.theme.colors.tertiary};
`;

const OrderMethodText = styled.Text`
  ${({theme}) => theme.fonts.body2};
  font-weight: 600;
  color: ${props => props.theme.colors.tertiary};
`;

const S = {
  Container,
  PaymentInfoText,
  ProductDescription,
  TextRowWrapper,
  OrderMethodText,
};

export default S;
