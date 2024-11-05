import styled from '@emotion/native';

const ListItem = styled.View<{isFirst: boolean; isLast: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  ${({isFirst}) =>
    isFirst && 'border-top-left-radius: 8px; border-top-right-radius: 8px;'}
  ${({isLast}) =>
    isLast &&
    'border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-bottom-width: 0;'}
`;

const ListWrapper = styled.View`
  width: 100%;
`;

const ItemLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ItemValue = styled.Text`
  font-size: 16px;
  color: #888;
`;

const S = {
  ListItem,
  ListWrapper,
  ItemLabel,
  ItemValue,
};

export default S;
