import {to6DigitHash} from './hash';

describe('to6DigitHash', () => {
  it('should return a 6-digit hash', () => {
    expect(to6DigitHash('test')).toHaveLength(6);
  });
  it('should return the same hash for the same input', () => {
    expect(to6DigitHash('test')).toBe(to6DigitHash('test'));
  });
  it('should return different hashes for different inputs', () => {
    expect(to6DigitHash('test')).not.toBe(to6DigitHash('test2'));
  });
  it('should collision when many trial (1,000,000)', () => {
    const trial = 1_000_000;
    const hashSet = new Set(
      Array.from({length: trial}, (_, i) => to6DigitHash(`${i}`)),
    );
    console.log(hashSet.size);

    expect(hashSet.size).not.toEqual(trial);
  });
});
