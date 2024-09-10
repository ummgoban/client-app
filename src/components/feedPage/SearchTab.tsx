import React, {useState} from 'react';
import {Image, Alert} from 'react-native';
import S from './SearchTab.style';
//TODO : 검색시 searchHandler 로직 구현 (논의 필요) + 엔터시 onKeyPress넣을지?
const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    Alert.alert('검색로직구현...', `검색어: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <S.Container>
      <S.SearchWrapper>
        <S.SearchInput
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <S.SearchButton onPress={handleSearch}>
          <Image
            source={{
              uri: 'https://webstockreview.net/images/search-icon-png-4.png',
            }}
            style={{width: 24, height: 24}}
          />
        </S.SearchButton>
      </S.SearchWrapper>
    </S.Container>
  );
};

export default SearchTab;
