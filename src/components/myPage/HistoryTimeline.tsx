import React from 'react';
import S from './HistoryTimeline.style';
import {Text} from 'react-native-paper';
import {format} from '../../utils/date';

const HistoryTimeline = ({
  title,
  timestamp,
  description,
}: {
  title: string;
  timestamp: number;
  description: string | null;
}) => {
  return (
    <S.HistoryTimelineItem>
      <Text>{title}</Text>
      <Text>{format(timestamp, 'HH시 mm분')}</Text>
      {description != null && <Text>{description}</Text>}
    </S.HistoryTimelineItem>
  );
};

export default HistoryTimeline;
