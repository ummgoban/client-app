import styled from '@emotion/native';
import {Chip} from 'react-native-paper';

const ChipContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;

  gap: 8px;
`;

const DateChip = styled(Chip)`
  width: 84px;
  height: 32px;

  background-color: ${props =>
    props.selected ? props.theme.colors.primary : '#f5f5f5'};
`;

const S = {ChipContainer, DateChip};

export default S;
