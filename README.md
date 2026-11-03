# dsh-superagent-lab

A small playground repository for [dsh-superagent](https://github.com/deepseek-ai/dsh-superagent-prototype):
an autonomous agent watches this repository, turns authorized requests into Tickets, and opens pull
requests of its own.

## The project

A dependency-free Node.js library (ESM, Node 22+) that formats byte counts, plus a small CLI.

```sh
node src/cli.js 1536           # 1.5 KiB
node src/cli.js --json 1536 0  # [{"bytes":1536,"value":"1.5","unit":"KiB"},{"bytes":0,"value":"0","unit":"B"}]
node --test                    # run the tests
```

Documented behaviour of `formatBytes(bytes)`:

- `0` returns `'0 B'`.
- Values are scaled to the largest unit that keeps the number below 1024: `B`, `KiB`, `MiB`, `GiB`, `TiB`.
- Values at or above 1 TiB are reported **in TiB**, never in a unit the list does not have.
- The number keeps one decimal place, except that values of 100 or more print no decimals.

## Known open work

See the open Issues: one seeded bug and one feature request. They are the agent's test cases.
