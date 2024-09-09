import styled from '@emotion/native';

const HistoryTimelineItem = styled.View`
  display: flex;
  flex-direction: column;
`;

const TitleLayout = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const CheckIcon = styled.Image`
  width: 24px;
  height: 24px;

  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  margin-right: 12px;
`;

const Timestamp = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  color: #b5b5b5;
`;

const DescriptionLayout = styled.View`
  display: flex;
  flex-direction: row;

  min-height: 16px;
`;

const DashedLine = styled.View<{dashline?: boolean}>`
  margin: 0 11.5px;

  height: 100%;

  border-width: 1px;
  border-style: dashed;
  border-color: ${props => (props.dashline ? '#b5b5b5;' : 'transparent;')};
`;

const Description = styled.Text`
  margin: 10px 0 10px 20px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  color: #545454;
`;

const S = {
  HistoryTimelineItem,
  TitleLayout,
  CheckIcon,
  Title,
  Timestamp,
  DescriptionLayout,
  DashedLine,
  Description,
};

export default S;
