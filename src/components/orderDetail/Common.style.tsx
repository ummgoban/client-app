import styled from '@emotion/native';
import {Text} from 'react-native-paper';

const InfoText = styled.Text`
  ${props => props.theme.fonts.subtitle1};
`;

const InfoBoldText = styled.Text`
  ${props => props.theme.fonts.h6};
  font-weight: 700;
`;

const C = {InfoBoldText, InfoText};

export default C;
