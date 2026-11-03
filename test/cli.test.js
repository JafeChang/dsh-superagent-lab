import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cli = fileURLToPath(new URL('../src/cli.js', import.meta.url))

function run(args) {
  try {
    return { code: 0, out: execFileSync('node', [cli, ...args], { encoding: 'utf8' }) }
  } catch (error) {
    return { code: error.status, out: error.stdout ?? '', err: error.stderr ?? '' }
  }
}

test('formats every byte count on the command line', () => {
  const result = run(['1536', '0'])
  assert.equal(result.code, 0)
  assert.equal(result.out, '1.5 KiB\n0 B\n')
})

test('prints a JSON array with --json', () => {
  const result = run(['--json', '1536', '0'])
  assert.equal(result.code, 0)
  assert.deepEqual(JSON.parse(result.out), [
    { bytes: 1536, value: '1.5', unit: 'KiB' },
    { bytes: 0, value: '0', unit: 'B' },
  ])
})

test('keeps --help working', () => {
  const result = run(['--help'])
  assert.equal(result.code, 0)
  assert.equal(result.out, 'usage: node src/cli.js [--json] <bytes> [<bytes>...]\n')
})

test('asks for a byte count when --json has none', () => {
  const result = run(['--json'])
  assert.equal(result.code, 1)
  assert.match(result.out, /usage: node src\/cli\.js/)
})

test('refuses a bad byte count in JSON mode without printing JSON', () => {
  const result = run(['--json', 'ten'])
  assert.equal(result.code, 1)
  assert.equal(result.out, '')
  assert.match(result.err, /not a byte count: ten/)
})

test('asks for a byte count when given none', () => {
  const result = run([])
  assert.equal(result.code, 1)
  assert.match(result.out, /usage: node src\/cli\.js/)
})

test('refuses an argument that is not a byte count', () => {
  const result = run(['ten'])
  assert.equal(result.code, 1)
  assert.match(result.err, /not a byte count: ten/)
})
