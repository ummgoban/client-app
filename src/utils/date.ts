import dayjs from 'dayjs';
import 'dayjs/locale/ko';

/**
 * @description 타임스탬프를 원하는 형식으로 변환합니다.
 * @param timestamp 타임스탬프
 * @param template 변환 형식
 * @returns 변환된 날짜
 * @example format(1627772400000) // '2021. 07. 31. (토)'
 */
export function format(
  timestamp: number | string | Date,
  template?: string,
): string {
  const date = new Date(timestamp);

  return dayjs(date)
    .locale('ko')
    .format(template ?? 'YYYY. MM. DD. (dd)');
}

/**
 * @description 10진수 float값을 시간으로 변환합니다.
 * @param decimal 10진수 float값
 * @returns `[hour, minute]`
 * @example decimalToTime(1.5) // [1, 30]
 */
export function decimalToTime(decimal: number): [number, number] {
  const hour = Math.floor(decimal);
  const minute = Math.floor((decimal - hour) * 60);

  return [hour, minute];
}

/**
 * @description 숫자를 2자리로 만들어줍니다.
 * @param num `number`
 * @returns `string` 2자리 숫자
 * @example zeroPad(1) // '01'
 */
export function zeroPad(num: number): string {
  return num.toString().padStart(2, '0');
}

/**
 * @description dateA가 dateB보다 이후인지 확인합니다.
 * @param dateA 기준 시간
 * @param dateB 비교할 시간
 * @param unit 비교 단위
 * @returns `boolean` dateA가 dateB보다 이후인지 여부
 * @example isAfter(new Date(), new Date() + 10000) // true
 */
export function isAfter(
  dateA: Date,
  dateB: Date,
  unit?: dayjs.OpUnitType,
): boolean {
  return dayjs(dateA).isAfter(dateB, unit);
}

/**
 * @description 현재 시간이 target 시간 이후인지 확인합니다.
 * @param target 비교할 시간
 * @param unit 비교 단위
 * @returns `boolean` 현재 시간이 target 시간 이후인지 여부
 * @example isAfter(new Date() + 10000) // true
 */
export function isAfterNow(target: Date, unit?: dayjs.OpUnitType): boolean {
  return dayjs().isAfter(target, unit);
}
