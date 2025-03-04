import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import ListIcon from '@/assets/icons/list-regular.svg';

import theme from '@/context/theme';

import MyLocationMap from '@/components/map/MyLocationMap';
import FeedBottomFloatingButton from '@/components/common/FeedBottomFloatingButton';

import {
  DetailStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';

import S from './MapScreen.style';

type MapScreenRouteProp = RouteProp<DetailStackParamList, 'Map'>;

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {cords} = route.params;

  const handleClickFeedListButton = () => {
    navigation.navigate('Feed');
  };

  return (
    <S.Container>
      <MyLocationMap cords={cords} />
      <FeedBottomFloatingButton
        onPress={handleClickFeedListButton}
        Icon={<ListIcon color={theme.colors.dark} width={18} height={18} />}
        label="목록보기"
      />
    </S.Container>
  );
};

export default MapScreen;
