import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';

const GeocodingExample = () => {
  const [address, setAddress] = useState('');
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  const getCoordinates = async () => {
    console.log(address);
    try {
      const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`;
      const response = await fetch(apiUrl, {
        headers: {
          'x-ncp-apigw-api-key-id': 'yko9b1hpv3',
          'x-ncp-apigw-api-key': 'NBR6O11YRqjZH27E7g6AczlPi4GmQlUht76LH9bQ',
        },
      });

      const data = await response.json();
      console.log(data.addresses[0]);
      // if (data.addresses && data.results.length > 0) {
      //   const {x, y} = data.results[0];
      //   setLatitude(y);
      //   setLongitude(x);
      //   Alert.alert('위치 정보', `위도: ${y}, 경도: ${x}`);
      // } else {
      //   Alert.alert('Error', '주소를 찾을 수 없습니다.');
      // }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', '주소 변환 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="주소를 입력하세요"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="좌표 찾기" onPress={getCoordinates} />
      {/* {latitude && longitude && (
        <Text style={{marginTop: 20}}>
          위도: {latitude}, 경도: {longitude}
        </Text>
      )} */}
    </View>
  );
};

export default GeocodingExample;
