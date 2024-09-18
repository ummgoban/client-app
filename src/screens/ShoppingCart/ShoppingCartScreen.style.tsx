import styled from '@emotion/native';
import Common from '@/components/CartPage/Common.style';

const CartPage = styled.View`
  flex: 1;
  margin: 0 16px;
`;
const CardContainer = styled.View`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 8px 0px;
`;

const ProductImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const flexRowWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const CountButton = styled.Button``;

const HeaderText = styled(Common.HeaderText)``;
const DetailText = styled(Common.BodyText)``;
const ScrollView = styled.ScrollView``;

const S = {
  ProductImage,
  CartPage,
  ScrollView,
  CardContainer,
  HeaderText,
  DetailText,
  flexRowWrapper,
  CountButton,
};

export default S;
