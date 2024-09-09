import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function format(timestamp: number, template?: string): string {
  const date = new Date(timestamp);

  return dayjs(date)
    .locale('ko')
    .format(template ?? 'YYYY. MM. DD. (dd)');
}

const date = {
  format,
};

export default date;
