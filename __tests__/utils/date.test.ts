import {it, expect} from '@jest/globals';
import {format, decimalToTime, zeroPad, isAfter} from '@utils/date';

it('should return format date', () => {
  const timestamp = 1618225200000;

  expect(format(timestamp)).toBe('2021. 04. 12. (월)');
  expect(format(timestamp, 'YYYY년 M월 D일 (dd)')).toBe('2021년 4월 12일 (월)');
});

it('should return decimal to time', () => {
  expect(decimalToTime(1.5)).toEqual([1, 30]);
  expect(decimalToTime(1.75)).toEqual([1, 45]);
});

it('should return zero pad', () => {
  expect(zeroPad(1)).toBe('01');
  expect(zeroPad(10)).toBe('10');
});

it('should return is after', () => {
  expect(isAfter(new Date(Date.now() - 10000))).toBe(true);
  expect(isAfter(new Date(Date.now() + 10000))).toBe(false);
});
