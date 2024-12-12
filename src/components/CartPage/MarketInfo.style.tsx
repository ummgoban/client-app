import styled from '@emotion/native';

import S from './Common.style';

const MarketInfoWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin: 8px;
  align-items: center;
  justify-content: center;
  background-color: white;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const MarketInfoText = styled(S.HeaderText)`
  padding: 4px 0;
`;

const MarketInfoImage = styled.Image`
  width: 32px;
  height: 32px;
`;

const MarketInfo = {MarketInfoImage, MarketInfoText, MarketInfoWrapper};

export default MarketInfo;
