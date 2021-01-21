const polkadotApi = require('@polkadot/api');

const { ApiPromise, WsProvider } = polkadotApi;

const establishConnection = async (provider) => {
  const wsProvider = new WsProvider(provider.node);
  const api = await ApiPromise.create({ 
    provider: wsProvider,
    types: provider.api.types
  });
  return api
}

module.exports = establishConnection