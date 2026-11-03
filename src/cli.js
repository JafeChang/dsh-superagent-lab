import { formatBytes } from './bytes.js'

const usage = 'usage: node src/cli.js [--json] <bytes> [<bytes>...]'

function parseByteCount(argument) {
  const bytes = Number(argument)
  if (!Number.isFinite(bytes) || bytes < 0) {
    process.stderr.write(`not a byte count: ${argument}\n`)
    return null
  }
  return bytes
}

export function run(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    process.stdout.write(`${usage}\n`)
    return 0
  }
  const json = argv.includes('--json')
  const argumentsToFormat = argv.filter((argument) => argument !== '--json')
  if (argumentsToFormat.length === 0) {
    process.stdout.write(`${usage}\n`)
    return 1
  }
  if (json) {
    const entries = []
    for (const argument of argumentsToFormat) {
      const bytes = parseByteCount(argument)
      if (bytes === null) return 1
      const [value, unit] = formatBytes(bytes).split(' ')
      entries.push({ bytes, value, unit })
    }
    process.stdout.write(`${JSON.stringify(entries)}\n`)
    return 0
  }
  for (const argument of argumentsToFormat) {
    const bytes = parseByteCount(argument)
    if (bytes === null) return 1
    process.stdout.write(`${formatBytes(bytes)}\n`)
  }
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = run(process.argv.slice(2))
