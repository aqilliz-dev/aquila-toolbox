const runBenchmark = require('./benchmark')
const config = require('../config')

const { provider, benchmark } = config

const main = async () => {
  await runBenchmark(provider, benchmark)
}

main()