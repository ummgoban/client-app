import React from 'react';
import {Marker} from 'react-native-naver-map';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import S from './MyLocationMap.style';

type RootStackParamList = {
  Detail: {screen: 'Market'; params: {marketId: string}};
};
const MyLocationMap = ({
  cords,
}: {
  cords: {
    marketName: string;
    marketId: string;
    latitude: number;
    longitude: number;
  }[];
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleMarkerClick = (marketId: string) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };
  return (
    <S.MapWrapper>
      <S.MapView
        center={{
          zoom: 10,
          tilt: 0,
          //에뮬레이터 확인위해 현재 인덱스1로 설정, 배포시 0으로 수정
          latitude: cords[1]?.latitude || 37.582831666666664,
          longitude: cords[1]?.longitude || 127.06107333333334,
        }}>
        {cords.map((coord, index) => (
          <Marker
            key={coord.marketId}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            //DB 주소 수정되면 인덱스 0인경우만 green 처리
            pinColor={index === (0 || 1) ? 'green' : 'blue'}
            caption={{
              text: coord.marketName,
              textSize: 12,
            }}
            onClick={() => handleMarkerClick(coord.marketId)}
          />
        ))}
      </S.MapView>
    </S.MapWrapper>
  );
};

export default MyLocationMap;
