import styled from '@emotion/native';

const MenuWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12px;
  margin-bottom: 16px;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 8px;
  background-color: white;
`;
const MenuBoxLeft = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const MenuName = styled.Text`
  color: #2d3e39;
  font-size: 18px;
  font-weight: 600;
`;

const MenuOriginalPrice = styled.Text`
  color: var(--gray-gray5, #979797);
  font-size: 13px;
  font-weight: 400;
  text-decoration-line: line-through;
`;
const MenuDiscountPrice = styled.Text`
  color: #2d3e39;
  font-size: 16px;
  font-weight: 700;
`;
const MenuBoxRight = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MenuImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 18px;
`;

const MenuTimeText = styled.Text`
  color: green;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.065px;
`;

const MenuCounter = styled.View`
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  width: 140px;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;
const MenuCounterButtonWrapper = styled.TouchableOpacity`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  background-color: lightblue;
  height: 30px;
  text-align: center;
`;

const MenuCounterButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const MenuDeleteButtonWrapper = styled.TouchableOpacity`
  display: flex;
  width: 70px;
  text-align: center;
`;

const MenuDeleteText = styled.Text`
  font-size: 16px;
  font-color: #e2e2e2;
  font-weight: 100;
`;

const S = {
  MenuWrapper,
  MenuBoxLeft,
  MenuName,
  MenuOriginalPrice,
  MenuDiscountPrice,
  MenuBoxRight,
  MenuImage,
  MenuTimeText,
  MenuCounter,
  MenuCounterButtonWrapper,
  MenuCounterButton,
  MenuDeleteButtonWrapper,
  MenuDeleteText,
};

export default S;
