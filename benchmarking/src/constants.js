const getBlockchainConstants = (api) => {
  const maximumBlockWeight = api.consts.system.maximumBlockWeight.toHuman()
  const maximumBlockLength = api.consts.system.maximumBlockLength.toHuman()

  const blockExecutionWeight = api.consts.system.blockExecutionWeight.toHuman()
  const extrinsicBaseWeight = api.consts.system.extrinsicBaseWeight.toHuman()

  const transactionPayment = api.consts.transactionPayment.transactionByteFee.toHuman()
  const weightToFee = api.consts.transactionPayment.weightToFee.toHuman()

  console.log('Maximum Block Weight', maximumBlockWeight)
  console.log('Maximum Block Length', maximumBlockLength)

  console.log('Block Execution Weight', blockExecutionWeight)
  console.log('Extrinsic Base Weight', extrinsicBaseWeight)

  console.log('Transaction Payment', transactionPayment)
  console.log('Weight to Fee', weightToFee)
}

module.exports = getBlockchainConstants