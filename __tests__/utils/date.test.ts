import {it, expect} from '@jest/globals';
import date from '../../src/utils/date';

it('should return format date', () => {
  const timestamp = 1618225200000;

  expect(date.format(timestamp)).toBe('2021. 04. 12. (월)');
  expect(date.format(timestamp, 'YYYY년 M월 D일 (dd)')).toBe(
    '2021년 4월 12일 (월)',
  );
});
