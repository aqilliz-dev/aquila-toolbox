const BN = require('bn.js');

const sendTransactions = async (api, wallet, extrinsic, numOfTxs, testCounter) => {
  return new Promise(async resolve => {
    console.log(`\n------------------------------ Test #${testCounter} ----------------------------------\n`)
    console.time('Transactions sent to the node in');

    const one = new BN(1);
    let nonce = await api.rpc.system.accountNextIndex(wallet.address);
    
    for (let i=0; i < numOfTxs; i++) {
      extrinsic(api, wallet, nonce)
      nonce = nonce.add(one)
    }
  
    console.timeEnd('Transactions sent to the node in');
    resolve()
  })
}

module.exports = sendTransactions