import React from 'react';
import {format} from '@utils/date';
import S from './HistoryTimeline.style';

// TODO: 이미지 경로 수정
const checkImageSrc = 'https://cdn-icons-png.freepik.com/512/5610/5610944.png';

const HistoryTimeline = ({
  title,
  timestamp,
  description,
  dashline = true,
}: {
  title: string;
  timestamp: string;
  description: string | null;
  dashline?: boolean;
}) => {
  return (
    <S.HistoryTimelineItem>
      <S.TitleLayout>
        <S.CheckIcon source={{uri: checkImageSrc}} width={24} height={24} />
        <S.Title>{title}</S.Title>
        <S.Timestamp>{format(timestamp, 'HH시 mm분')}</S.Timestamp>
      </S.TitleLayout>
      <S.DescriptionLayout>
        <S.DashedLine dashline={dashline} />
        {description && <S.Description>{description}</S.Description>}
      </S.DescriptionLayout>
    </S.HistoryTimelineItem>
  );
};

export default HistoryTimeline;
