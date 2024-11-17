import React from 'react';
import {View, Dimensions} from 'react-native';
import NaverMapView, {Marker} from 'react-native-naver-map';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Detail: {screen: 'Market'; params: {marketId: string}};
};
const MyLocationMap = ({
  dummyCords,
}: {
  dummyCords: {
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
    <View
      style={{
        width: Dimensions.get('window').width - 30,
        marginTop: 10,
      }}>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        center={{
          zoom: 10,
          tilt: 0,
          latitude: dummyCords[0]?.latitude || 0,
          longitude: dummyCords[0]?.longitude || 0,
        }}>
        {dummyCords.map((coord, index) => (
          <Marker
            key={coord.marketId}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            //DB 주소 수정되면 인덱스 1인경우도 blue 처리
            pinColor={index === (0 || 1) ? 'green' : 'blue'}
            caption={{
              text: coord.marketName,
              textSize: 16,
            }}
            onClick={() => handleMarkerClick(coord.marketId)}
          />
        ))}
      </NaverMapView>
    </View>
  );
};

export default MyLocationMap;
