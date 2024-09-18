import styled from '@emotion/native';
import S from './Common.style';

const MarketInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 8px;
  margin: 0 16px;
  align-items: center;
  justify-content: center;
`;

const MarketInfoText = styled(S.HeaderText)`
  margin-left: 16px;
`;

const MarketInfoImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const HeaderText = styled(S.HeaderText)``;
const BodyText = styled(S.BodyText)``;

const MarketInfo = {MarketInfoImage, MarketInfoText, MarketInfoWrapper};

export default MarketInfo;
