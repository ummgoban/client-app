// EmptyCartPage.style.ts
import styled from '@emotion/native';

const EmptyCartContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
});

const MessageText = styled.Text({
  fontSize: 18,
  color: '#333',
  marginBottom: 20,
});

const GoShoppingButton = styled.TouchableOpacity({
  backgroundColor: '#ff7f50',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
});

const GoShoppingText = styled.Text({
  color: '#fff',
  fontSize: 16,
});

const S = {
  EmptyCartContainer,
  GoShoppingButton,
  MessageText,
  GoShoppingText,
};

export default S;
