const sendTransactions = require('./send-transactions')
const graphs = require('./graphs')
const { generateGraphData, generateGraph } = graphs


const subscribeToNewBlocks = async (
  api, 
  wallet, 
  extrinsic, 
  initExtrinsicsAmount, 
  testCounter, 
  benchmarkGraphs, 
  benchmarkConstants
) => {
  const { numOfTxs, msPerBlock, numOfTests } = benchmarkConstants
  let percentageFullPool = 0
  let prevPercentageFullPool = 0
  let totalProcessedTxs = 0
  let totalReceivedTxs = 0
  let blockCounter = 1
  let graphStepsData = { 
    '[0-10%)': [], 
    '[10-20%)': [],
    '[20-30%)': [],
    '[30-40%)': [], 
    '[40-50%)': [], 
    '[50-60%)': [],
    '[60-70%)': [],
    '[70-80%)': [],
    '[80-90%)': [],
    '[90-100%]': []
  }

  const unsubscribe = await api.rpc.chain.subscribeNewHeads(async (block) => {
    const pendingTxs = await api.rpc.author.pendingExtrinsics()
    const blockHash = await api.rpc.chain.getBlockHash(block.number)
    const signedBlock = await api.rpc.chain.getBlock(blockHash)     
    const processedTxs = signedBlock['block']['extrinsics'].length - 1 //Substract Timestamp Extrinsic

    // console.log('Encoded Lenght', pendingTxs[1].encodedLength, ' bytes') // the good one
    // console.log('Lenght', pendingTxs[1].length, ' bytes')

    prevPercentageFullPool = percentageFullPool
    totalProcessedTxs += processedTxs
    totalReceivedTxs = totalProcessedTxs + pendingTxs.length
    percentageFullPool = ((pendingTxs.length * 100) / numOfTxs).toFixed(2)

    console.log(`============== Block: #${block.number} ===============`);
    console.log(`Processed        ${processedTxs}`)
    console.log(`Pending          ${pendingTxs.length}\n`)
    console.log(`Total Received   ${totalReceivedTxs}`)
    console.log(`Total Processed  ${totalProcessedTxs}\n\n`)

    if (processedTxs > 0) {
      //console.log(blockCounter)
      const tps = processedTxs / (blockCounter * msPerBlock / 1000)
      blockCounter = 0
      console.log(`TPS: ${Number(tps.toFixed(2))} with ${prevPercentageFullPool}%`)
      if (benchmarkGraphs.generate) {
        graphStepsData = generateGraphData({ tps: Number(tps.toFixed(2)), full: prevPercentageFullPool, graphStepsData })
      } 
    }

    if (totalReceivedTxs === totalProcessedTxs && (totalReceivedTxs == numOfTxs || totalReceivedTxs == numOfTxs + initExtrinsicsAmount)) {
      if (testCounter === numOfTests) {
        unsubscribe();
        if (benchmarkGraphs.generate) {
          generateGraph(graphStepsData, benchmarkGraphs)
        }
        process.exit(0);
      } else {
        testCounter++
        percentageFullPool = 0
        prevPercentageFullPool = 0
        totalProcessedTxs = 0
        totalReceivedTxs = 0
        blockCounter = 1
        await sendTransactions(api, wallet, extrinsic, numOfTxs, testCounter)
      }
    }
    blockCounter++
  });
}

module.exports = subscribeToNewBlocks