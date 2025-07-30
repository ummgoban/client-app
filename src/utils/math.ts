export function formatFixedFloor(num: number, fixed: number): string {
  const factor = Math.pow(10, fixed);
  return (Math.floor(num * factor) / factor).toFixed(fixed);
}
