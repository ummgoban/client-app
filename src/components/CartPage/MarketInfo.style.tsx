import styled from '@emotion/native';

const MarketInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 8px;
  margin: 0 16px;
  align-items: center;
`

const MarketInfoText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-left: 16px;
  `

  const MarketInfoImage = styled.Image`
    width: 25px;
    height: 25px;
    margin-left: 8px;
  `

  const S = {MarketInfoImage, MarketInfoText, MarketInfoWrapper}

  export default S;