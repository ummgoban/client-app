import styled from '@emotion/native';
import C from './Common.style';

const Container = styled.View`
  display: flex;
  margin: 32px 16px;
  gap: 16px;
  background-color: white;
`;
const InfoTextRowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InfoBoldText = styled.Text`
  ${({theme}) => theme.fonts.body1};
  color: ${props => props.theme.colors.tertiary};
  font-weight: 700;
`;
const InfoText = styled.Text`
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
  InfoBoldText,
  InfoText,
  InfoTextRowWrapper,
  OrderMethodText,
};

export default S;
