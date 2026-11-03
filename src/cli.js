import { formatBytes } from './bytes.js'

const usage = 'usage: node src/cli.js <bytes> [<bytes>...]'

export function run(argv) {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    process.stdout.write(`${usage}\n`)
    return argv.length === 0 ? 1 : 0
  }
  for (const argument of argv) {
    const bytes = Number(argument)
    if (!Number.isFinite(bytes) || bytes < 0) {
      process.stderr.write(`not a byte count: ${argument}\n`)
      return 1
    }
    process.stdout.write(`${formatBytes(bytes)}\n`)
  }
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = run(process.argv.slice(2))
