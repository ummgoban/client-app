import styled from '@emotion/native';

import NaverMapView from 'react-native-naver-map';

const MapWrapper = styled.View`
  margin-top: 10px;
`;
const MapView = styled(NaverMapView)`
  width: 100%;
  height: 100%;
`;
const S = {MapWrapper, MapView};
export default S;
