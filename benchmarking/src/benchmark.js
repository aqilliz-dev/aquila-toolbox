const establishConnection = require('./connect-to-provider')
const generateKeyPair = require('./generate-key-pair')
const sendTransactions = require('./send-transactions')
const subscribeToNewBlocks = require('./subscribe')
const getBlockchainConstants = require('./constants')

const benchmark = async (provider, benchmark) => {
  const { graphs, extrinsics, senderSecretSeed, constants } = benchmark

  const api = await establishConnection(provider)
  const wallet = await generateKeyPair(senderSecretSeed)

  let testCounter = 1

  getBlockchainConstants(api)

  let nonce = await api.rpc.system.accountNextIndex(wallet.address);

  await extrinsics.init(api, wallet, nonce)

  await sendTransactions(api, wallet, extrinsics.main, constants.numOfTxs, testCounter)

  await subscribeToNewBlocks(
    api, 
    wallet, 
    extrinsics.main, 
    extrinsics.initExtrinsicsAmount, 
    testCounter, 
    graphs,
    benchmark.constants
  )
}

module.exports = benchmark