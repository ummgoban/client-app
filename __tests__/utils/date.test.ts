import {it, expect} from '@jest/globals';
<<<<<<< HEAD
import date from '../../src/utils/date';
=======
import date from '@utils/date';
>>>>>>> main

it('should return format date', () => {
  const timestamp = 1618225200000;

  expect(date.format(timestamp)).toBe('2021. 04. 12. (월)');
  expect(date.format(timestamp, 'YYYY년 M월 D일 (dd)')).toBe(
    '2021년 4월 12일 (월)',
  );
});
<<<<<<< HEAD
=======

it('should return decimal to time', () => {
  expect(date.decimalToTime(1.5)).toEqual([1, 30]);
  expect(date.decimalToTime(1.75)).toEqual([1, 45]);
});

it('should return zero pad', () => {
  expect(date.zeroPad(1)).toBe('01');
  expect(date.zeroPad(10)).toBe('10');
});

it('should return is after', () => {
  expect(date.isAfter(new Date(Date.now() - 10000))).toBe(true);
  expect(date.isAfter(new Date(Date.now() + 10000))).toBe(false);
});
>>>>>>> main
