import {getStoreList} from '@/apis';
import {SearchTab, Store} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';
import {StoreType} from '@/types/StoreType';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import S from './SearchBar.style';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  const [storeList, setStoreList] = useState<StoreType[] | null>(null);
  const fetchData = useCallback(async () => {
    const res = await getStoreList();
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    setStoreList(res);
  }, []);

  const onPressStore = (storeId: number) => {
    navigation.navigate('Detail', {
      screen: 'Store',
      params: {storeId},
    });
  };

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!storeList) {
    return (
      <View>
        <Text>가게목록을 불러오는데 실패했습니다.</Text>
      </View>
    );
  }

  return (
    <S.Container>
      <S.SearchWrapper>
        <SearchTab />
      </S.SearchWrapper>
      <ScrollView
        style={{marginTop: 50}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {storeList.map(store => (
          <Store key={store.id} onPress={onPressStore} store={store} />
        ))}
      </ScrollView>
    </S.Container>
  );
};
export default FeedScreen;
