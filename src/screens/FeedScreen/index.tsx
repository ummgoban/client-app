import React from 'react';
import {View, Alert, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StoreType} from '@/types/StoreType';
import {getStoreList} from '@/apis';
import {SearchTab, Store} from '@/components/feedPage';
import {useCallback} from 'react';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RefreshControl} from 'react-native';
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
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', top: 0, width: '100%', zIndex: 1}}>
        <SearchTab />
      </View>
      <ScrollView
        style={{marginTop: 50}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {storeList.map((store, index) => (
          <Store key={index} navigation={navigation} store={store} />
        ))}
      </ScrollView>
    </View>
  );
};
export default FeedScreen;
