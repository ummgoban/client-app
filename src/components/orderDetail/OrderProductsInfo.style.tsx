import styled from '@emotion/native';
import C from './Common.style';

const Container = styled.View`
  display: flex;
  margin: 32px 16px;
  gap: 16px;
  background-color: white;
`;
const InfoTextRowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InfoBoldText = styled(C.InfoBoldText)``;
const InfoText = styled(C.InfoText)``;

const S = {
  Container,
  InfoBoldText,
  InfoText,
  InfoTextRowWrapper,
};

export default S;
