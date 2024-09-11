import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  padding-left:5px
  justify-content: center;
`;

const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
  border-color: gray;

  border-radius: 5px;
  padding-horizontal: 10px;
`;

const SearchButton = styled.TouchableOpacity``;

const S = {
  Container,
  SearchWrapper,
  SearchInput,
  SearchButton,
};

export default S;
