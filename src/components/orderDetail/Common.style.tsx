import styled from '@emotion/native';
import {Text} from 'react-native-paper';

const InfoText = styled(Text)`
  ${({theme}) => theme.fonts.subtitle1};
`;

const InfoBoldText = styled(Text)`
  ${({theme}) => theme.fonts.subtitle1};
  font-weight: 700;
`;

const C = {InfoBoldText, InfoText};

export default C;
