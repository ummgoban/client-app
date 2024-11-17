import {DetailStackParamList} from '@/types/StackNavigationType';
import {RouteProp, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';
import MyLocationMap from '@/components/map/MyLocationMap';

type MapScreenRouteProp = RouteProp<DetailStackParamList, 'Map'>;

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();

  const {dummyCords} = route.params;

  return (
    <View>
      <MyLocationMap dummyCords={dummyCords} />
    </View>
  );
};

export default MapScreen;
