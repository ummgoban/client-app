import styled from '@emotion/native';

const EmptyCartContainer = styled.View`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
  padding: 20px;
`;

const MessageText = styled.Text`
  font-size: 18;
  font-color: #333;
  margin-bottom: 20px;
`;

const GoShoppingButton = styled.TouchableOpacity`
  background-color: powderblue;
  border-radius: 5px;
`;

const GoShoppingText = styled.Text`
  font-size: 16px;
  font-color: #fff;
`;

const S = {
  EmptyCartContainer,
  GoShoppingButton,
  MessageText,
  GoShoppingText,
};

export default S;
