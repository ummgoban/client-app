import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export function format(timestamp: number, template?: string): string {
  const date = new Date(timestamp);

  return dayjs(date)
    .locale('ko')
    .format(template ?? 'YYYY. MM. DD. (dd)');
}
