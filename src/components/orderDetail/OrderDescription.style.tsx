import styled from '@emotion/native';
const Container = styled.View`
  display: flex;
  margin: 24px 16px 32px 16px;
  gap: 8px;
`;

const OrderDescriptionText = styled.Text`
  ${({theme}) => theme.fonts.body2};
  color: ${props => props.theme.colors.tertiary};
`;

const OrderStatusText = styled.Text`
  ${({theme}) => theme.fonts.h6};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const MarketName = styled.Text`
  ${({theme}) => theme.fonts.h5};
  color: ${props => props.theme.colors.tertiary};
  font-weight: 700;
`;

const MarketAddress = styled.Text`
  ${({theme}) => theme.fonts.subtitle1};
  color: ${props => props.theme.colors.tertiary};
  font-weight: 600;
`;

const MarketInformation = styled.TouchableOpacity`
  flex: 1;
  gap: 8px;
`;

const OrderDescription = styled.View`
  display: flex;
  flex: 1;
  gap: 8px;
  margin-top: 16px;
`;
const S = {
  Container,
  OrderDescriptionText,
  OrderStatusText,
  MarketName,
  MarketAddress,
  MarketInformation,
  OrderDescription,
};

export default S;
