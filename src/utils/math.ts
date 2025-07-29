export function floor(num: number, fixed: number): number {
  const factor = Math.pow(10, fixed);
  return Math.floor(num * factor) / factor;
}
