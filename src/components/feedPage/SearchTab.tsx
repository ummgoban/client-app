import React, {useState} from 'react';
import {Image, Alert} from 'react-native';
import S from './SearchTab.style';
import useDebounce from '@/hooks/useDebounce';

//TODO : 검색시 searchHandler 로직 구현 + 엔터시 onKeyPress넣을지?
//TODO: 아이콘 이미지 uri변경

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = () => {
    Alert.alert('검색로직구현...', `검색어: ${debouncedSearchQuery}`);
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
            width={24}
            height={24}
          />
        </S.SearchButton>
      </S.SearchWrapper>
    </S.Container>
  );
};

export default SearchTab;
