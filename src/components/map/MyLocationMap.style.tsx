import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import NaverMapView from 'react-native-naver-map';
const windowWidth = Dimensions.get('window').width;

const MapWrapper = styled.View`
  width: ${windowWidth - 30}px;
  margin-top: 10px;
`;
const MapView = styled(NaverMapView)`
  width: 100%;
  height: 100%;
`;
const S = {MapWrapper, MapView};
export default S;
