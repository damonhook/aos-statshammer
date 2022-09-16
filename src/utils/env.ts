export function parseBoolean(val: string) {
  return ['t', '1', 'true', 'yes'].includes(val.toString().toLowerCase())
}
