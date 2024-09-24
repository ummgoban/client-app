import styled from '@emotion/native';
import S from './Common.style';

const MarketInfoWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 8px 16px;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MarketInfoText = styled(S.HeaderText)`
  margin-left: 16px;
`;

const MarketInfoImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const MarketInfo = {MarketInfoImage, MarketInfoText, MarketInfoWrapper};

export default MarketInfo;
