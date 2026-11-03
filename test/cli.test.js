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
