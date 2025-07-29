import {format, decimalToTime, zeroPad, isAfter, isAfterNow} from './date';

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const nowDate = new Date(Date.now());

describe('format', () => {
  const date = new Date('2022-01-01 12:00:00');

  it('should return the default formatted date', () => {
    expect(format(date)).toBe('2022. 01. 01. (토)');
  });

  it('should return the custom formatted date', () => {
    expect(format(date, 'HH시 mm분')).toBe('12시 00분');
  });

  it('should handle timestamp as number', () => {
    const timestamp = date.getTime();
    expect(format(timestamp)).toBe('2022. 01. 01. (토)');
  });

  it('should handle timestamp as string', () => {
    const timestamp = '2022-01-01 12:00:00';
    expect(format(timestamp)).toBe('2022. 01. 01. (토)');
  });
});

describe('decimalToTime', () => {
  it('should convert decimal to hour and minute', () => {
    expect(decimalToTime(1.5)).toEqual([1, 30]);
  });

  it('should handle whole numbers', () => {
    expect(decimalToTime(2)).toEqual([2, 0]);
  });

  it('should handle complex decimal values', () => {
    expect(decimalToTime(3.75)).toEqual([3, 45]);
  });

  it('should handle zero', () => {
    expect(decimalToTime(0)).toEqual([0, 0]);
  });
});

describe('zeroPad', () => {
  it('should pad single digit with zero', () => {
    expect(zeroPad(1)).toBe('01');
  });

  it('should not pad double digits', () => {
    expect(zeroPad(10)).toBe('10');
  });

  it('should handle zero', () => {
    expect(zeroPad(0)).toBe('00');
  });

  it('should handle numbers greater than 99', () => {
    expect(zeroPad(100)).toBe('100');
  });
});

describe('isAfter', () => {
  it('should return true if dateA is after dateB', () => {
    expect(isAfter(nowDate, new Date(Date.now() + ONE_HOUR))).toBe(false);
  });

  it('should return false if dateA is before dateB', () => {
    expect(isAfter(nowDate, new Date(Date.now() - ONE_HOUR))).toBe(true);
  });
  it('should return false if dateA and dateB are the same day with unit "day"', () => {
    expect(isAfter(nowDate, new Date(Date.now() + ONE_HOUR), 'day')).toBe(
      false,
    );
  });

  it('should return true if dateA is after dateB with unit', () => {
    const oneDayAfterDate = new Date(Date.now() + ONE_DAY);

    expect(isAfter(oneDayAfterDate, nowDate, 'year')).toBe(false);
    expect(isAfter(oneDayAfterDate, nowDate, 'month')).toBe(false);
    expect(isAfter(oneDayAfterDate, nowDate, 'day')).toBe(true);
    expect(isAfter(oneDayAfterDate, nowDate, 'hour')).toBe(true);
    expect(isAfter(oneDayAfterDate, nowDate, 'minute')).toBe(true);
    expect(isAfter(oneDayAfterDate, nowDate, 'second')).toBe(true);
    expect(isAfter(oneDayAfterDate, nowDate, 'millisecond')).toBe(true);
  });
});

describe('isAfterNow', () => {
  it('should return true if target is after now', () => {
    expect(isAfterNow(new Date(Date.now() - ONE_HOUR))).toBe(true);
  });

  it('should return false if target is before now', () => {
    expect(isAfterNow(new Date(Date.now() + ONE_HOUR))).toBe(false);
  });
});
