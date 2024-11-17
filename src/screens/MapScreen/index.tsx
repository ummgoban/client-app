import {DetailStackParamList} from '@/types/StackNavigationType';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native';
import React from 'react';

type MapScreenRouteProp = RouteProp<DetailStackParamList, 'Map'>;

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();

  const {dummyCords} = route.params;

  return (
    <View>
      <Text>지금 전달된 좌표들:</Text>
      {dummyCords?.map((cord, index) => (
        <Text key={index}>
          {cord.marketId} : {cord.latitude}, {cord.longitude}
        </Text>
      ))}
    </View>
  );
};

export default MapScreen;
