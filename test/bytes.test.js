import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatBytes } from '../src/bytes.js'

test('zero is one byte unit', () => {
  assert.equal(formatBytes(0), '0 B')
})

test('scales to the largest unit below 1024', () => {
  assert.equal(formatBytes(1), '1.0 B')
  assert.equal(formatBytes(1023), '1023 B')
  assert.equal(formatBytes(1536), '1.5 KiB')
  assert.equal(formatBytes(1024 ** 2), '1.0 MiB')
  assert.equal(formatBytes(1024 ** 3 - 1), '1024 MiB')
})

test('drops decimals at 100 and above', () => {
  assert.equal(formatBytes(100), '100 B')
  assert.equal(formatBytes(99.9), '99.9 B')
})

test('refuses a byte count it cannot format', () => {
  assert.throws(() => formatBytes(-1), RangeError)
  assert.throws(() => formatBytes(Number.NaN), RangeError)
})

test('reports exactly 1 TiB in TiB', () => {
  assert.equal(formatBytes(1024 ** 4), '1.0 TiB')
})

test('reports exactly 1024 TiB in TiB', () => {
  assert.equal(formatBytes(1024 ** 5), '1024 TiB')
})

test('reports values above 1024 TiB in TiB', () => {
  assert.equal(formatBytes(1024 ** 6), '1048576 TiB')
})
