import {Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {Alert} from 'react-native';

const SearchTab = () => {
  //TODO: onChangeSearch에서 useDebounce 기능 추가
  //TODO : 검색시 searchHandler 로직 구현 (논의 필요) + 엔터시 onKeyPress넣을지?
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

export default SearchTab;
