import styled from '@emotion/native';
import {View} from 'react-native';
import NaverMapView from 'react-native-naver-map';

const MapWrapper = styled(View)<{width: number}>`
  width: ${({width}) => width}px;
  margin-top: 10px;
`;
const MapView = styled(NaverMapView)`
  width: 100%;
  height: 100%;
`;
const S = {MapWrapper, MapView};
export default S;
