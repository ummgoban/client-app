import {PropsOf} from '@emotion/react';
import React from 'react';
import S from './Common.style';

const Card = (props: PropsOf<typeof S.CommonCard>) => (
  <S.CommonCard {...props} />
);

const HeaderText = (props: PropsOf<typeof S.HeaderText>) => (
  <S.HeaderText {...props} />
);

const Common = {Card, HeaderText};

export default Common;
