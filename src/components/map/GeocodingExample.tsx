import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

const GeocodingExample = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getCoordinates = async () => {
    try {
      const apiUrl = `https://naveropenapi.apis.naver.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
      const response = await fetch(apiUrl, {
        headers: {
          'X-Naver-Client-Id': 'YOUR_CLIENT_ID',
          'X-Naver-Client-Secret': 'YOUR_CLIENT_SECRET',
        },
      });

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const {x, y} = data.results[0];
        setLatitude(y);
        setLongitude(x);
        Alert.alert('위치 정보', `위도: ${y}, 경도: ${x}`);
      } else {
        Alert.alert('Error', '주소를 찾을 수 없습니다.');
      }
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
      {latitude && longitude && (
        <Text style={{marginTop: 20}}>
          위도: {latitude}, 경도: {longitude}
        </Text>
      )}
    </View>
  );
};

export default GeocodingExample;
