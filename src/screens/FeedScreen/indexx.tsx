import React from 'react';
import {View, Button, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import styled from '@emotion/native';
import {StoreType} from '@/types/StoreType';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const dummyStoreList: StoreType[] = [
  {
    id: '1',
    name: '반찬가게1',
    pickupTime: '오후 06:00 ~ 10:00',
    products: [
      {
        id: '1',
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: '2',
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: '3',
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
  {
    id: '2',
    name: '반찬가게2',
    pickupTime: '오후 07:00 ~ 10:00',
    products: [
      {
        id: '4',
        name: '겉절이',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '80000',
        discountPrice: '6000',
      },
      {
        id: '2',
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: '5',
        name: '된장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
    ],
  },
  {
    id: '3',
    name: '반찬가게3',
    pickupTime: '오후 05:00 ~ 09:00',
    products: [
      {
        id: '1',
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: '2',
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: '3',
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
  {
    id: '4',
    name: '반찬가게4',
    pickupTime: '오후 06:00 ~ 10:00',
    products: [
      {
        id: '1',
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: '2',
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: '3',
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
];

const StoreWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
`;
const StoreImageContainer = styled.View`

flex-direction: row;
justify-content : space-between
padding: 10px`;

const StoreImageBox = styled.View`
  position: relative;
  flex: 1;
`;

const StoreImage = styled.Image`
  flex: 1;
  aspect-ratio: 1;
  margin-right: 10px;
  border-radius: 18px;
  opacity: 0.8;
`;

const PriceLabel = styled.Text`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

const StoreTitle = styled.Text`
font-size: 18px;
font-weight:800
padding: 0px 10px 5px 10px;
`;

const StorePickupTime = styled.Text`
  font-size: 12px;
  font-weight: 400;
  padding-left: 10px;
`;

const SearchTab = () => {
  //TODO: onChangeSearch에서 useDebounce 기능 추가
  //TODO : 검색시 searchHandler 로직 구현 (논의 필요) + 엔터시 onKeyPress넣을지? (모바일이라 불필요할지도)
  //FIXME : 검색 아이콘 띄우기 (현재 아이콘이 ? 로 뜨는 상태) -> 이미지로

  const [searchQuery, setSearchQuery] = useState<string>('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const searchHandler = (searchQuery: string): void => {
    setSearchQuery('');
    Alert.alert(`searchHandler logic.. ${searchQuery}`);
  };

  return (
    <Searchbar
      placeholder={'검색어를 입력하세요.'}
      mode="bar"
      onChangeText={onChangeSearch}
      value={searchQuery}
      onTraileringIconPress={e => {
        Alert.alert('kdsjfa;lkdj');
      }}
      onIconPress={() => searchHandler(searchQuery)}
      style={{
        height: 30,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 6,
      }}
      inputStyle={{
        minHeight: 0,
      }}
    />
  );
};

const StoreComponent = ({
  navigation,
  name,
  pickupTime,
  products,
}: Props & StoreType) => {
  return (
    <StoreWrapper
      onPress={() =>
        navigation.navigate('Detail', {
          screen: 'Store',
          params: {storeId: name},
        })
      }>
      <StoreImageContainer>
        {products.map((product, index) => (
          <StoreImageBox>
            <StoreImage key={index} source={{uri: product.image}} />
            <PriceLabel>
              {product.name}: {product.discountPrice}원
            </PriceLabel>
          </StoreImageBox>
        ))}
      </StoreImageContainer>
      <StoreTitle>{name}</StoreTitle>
      <StorePickupTime>픽업: {pickupTime}</StorePickupTime>
    </StoreWrapper>
  );
};

const FeedScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', top: 0, width: '100%', zIndex: 1}}>
        <SearchTab />
      </View>

      <SearchTab />
      <ScrollView style={{marginTop: 10}}>
        {dummyStoreList.map((store, index) => (
          <StoreComponent
            key={index}
            navigation={navigation}
            id={store.id}
            name={store.name}
            pickupTime={store.pickupTime}
            products={store.products}
          />
        ))}
        <Button
          title="Go to MyPage Screen"
          onPress={() => navigation.navigate('Home', {screen: 'MyPage'})}
        />
        <Button
          title="Go to Detail Screen"
          onPress={() =>
            navigation.navigate('Detail', {
              screen: 'Store',
              params: {storeId: 100},
            })
          }
        />
      </ScrollView>
    </View>
  );
};

export default FeedScreen;
