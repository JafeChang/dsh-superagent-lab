const UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB']

/**
 * Format a byte count with the largest unit that keeps the number below 1024.
 * Values at or above 1 TiB are reported in TiB.
 */
export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) throw new RangeError(`bytes must be a finite number >= 0, got ${bytes}`)
  if (bytes === 0) return '0 B'
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1)
  const value = bytes / 1024 ** unit
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${UNITS[unit]}`
}
