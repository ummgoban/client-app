import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import NaverMapView, {Marker} from 'react-native-naver-map';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const MyLocationMap = ({
  dummyCords,
}: {
  dummyCords: {marketId: string; latitude: number; longitude: number}[];
}) => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('Android 권한 요청 결과:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('위치 권한이 허용되지 않았습니다.');
        }
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        console.log('iOS 권한 요청 결과:', result);
        if (result === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('위치 권한이 허용되지 않았습니다.');
        }
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        console.log(position.coords);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width - 30,
        height: 200,
        marginTop: 10,
      }}>
      {location ? (
        <>
          <NaverMapView
            style={{width: '100%', height: '100%'}}
            center={{
              zoom: 10,
              tilt: 0,
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="green"
            />
            {dummyCords.map(coord => (
              <Marker
                key={coord.marketId}
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                pinColor="blue"
              />
            ))}
          </NaverMapView>
          <Text>
            현재 위치: {location.latitude}, {location.longitude}
          </Text>
        </>
      ) : (
        <Text>위치를 가져오는 중...</Text>
      )}
    </View>
  );
};

export default MyLocationMap;
