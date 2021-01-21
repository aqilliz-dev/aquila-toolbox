const polkadotApi = require('@polkadot/api');
const polkadotUtilCrypto = require('@polkadot/util-crypto');

const { Keyring } = polkadotApi
const { cryptoWaitReady } = polkadotUtilCrypto

const createKeyPair = async (secretSeed) => {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  return keyring.addFromUri(secretSeed);
}

module.exports = createKeyPair
