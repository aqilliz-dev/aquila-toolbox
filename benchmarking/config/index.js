const config = {
  provider: {
    node: 'ws://3.0.167.111:8044',
    api: {
      types: {
        "Address": "AccountId",
        "LookupSource": "AccountId",
        "ContinuousAccountData": {
          "principal": "u64",
          "deposit_date": "BlockNumber"
        },
        "U16F16": "[u8; 4]",
        "GroupIndex": "u32",
        "TaskId": "Vec<u8>",
        "PriorityScore": "u32",
        "RoundIndex": "u32",
        "Task": {
          "id": "TaskId",
          "score": "PriorityScore",
          "proposed_at": "BlockNumber"
        },
        "ValueStruct": {
          "integer": "i32",
          "boolean": "bool"
        },
        "BufferIndex": "u8",
        "AccountIdOf": "AccountId",
        "BalanceOf": "Balance",
        "FundInfoOf": "FundInfo",
        "FundInfo": {
          "beneficiary": "AccountId",
          "deposit": "Balance",
          "raised": "Balance",
          "end": "BlockNumber",
          "goal": "Balance"
        },
        "FundIndex": "u32",
        "InnerThing": {
          "number": "u32",
          "hash": "Hash",
          "balance": "Balance"
        },
        "SuperThing": {
          "super_number": "u32",
          "inner_thing": "InnerThing"
        },
        "InnerThingOf": "InnerThing",
        "PeerId": "(Vec<u8>)",
        "Keys": "SessionKeys2",
        "CampaignId": "Text",
        "Platform": "Text",
        "Date": "Text",
        "Source": "Text",
        "DateCampaign": "Text",
        "ErrorMessage": "Text",
        "Failed": "bool",
        "Campaign": {
          "name": "Text",
          "total_budget": "u128",
          "currency": "Text",
          "start_date": "Text",
          "end_date": "Text",
          "platforms": "Vec<Platform>",
          "advertiser": "Text",
          "brand": "Text",
          "reconciliation_threshold": "u128",
          "decimals": "u32",
          "version": "u8",
          "cpc": "(bool, u128)",
          "cpm": "(bool, u128)",
          "cpl": "(bool, u128)"
        },
        "AggregatedData": {
          "campaign_id": "CampaignId",
          "platform": "Platform",
          "date": "Date",
          "date_received": "Date",
          "source": "Source",
          "impressions": "u128",
          "clicks": "u128",
          "conversions": "u128"
        },
        "Kpis": {
          "final_count": "u128",
          "cost": "u128",
          "budget_utilisation": "u128",
          "zdmp": "u128",
          "platform": "u128",
          "client": "u128"
        },
        "ReconciledData": {
          "amount_spent": "u128",
          "budget_utilisation": "u128",
          "clicks": "Kpis",
          "impressions": "Kpis",
          "conversions": "Kpis"
        }
      }
    }
  },
  benchmark: {
    graphs: {
      generate: false,
      name: 'Balances-Benchmark',
      user: '',
      key: ''
    },
    constants: {
      numOfTxs: 8192,
      msPerBlock: 6000,
      numOfTests: 2
    },
    senderSecretSeed: '0xe259560d9446bb98f0582d0ae7ef01ab2b57b30ab3f2f16b59e3fee65d72be8b',
    data: {
      recipientAccount: '5GzNhAJtv143wbdh3N6q6EmjWHgg9KWiZY6AJBwRAiBatGFQ',
      amount: '100000000000'
    },
    extrinsics: {
      initExtrinsicsAmount: 0,
      init: async (api, wallet, nonce) => {}, // INIT_EXTRINSICS_AMOUNT = 0
      main: (api, wallet, nonce) => { 
        api.tx.balances.transfer(config.benchmark.data.recipientAccount, config.benchmark.data.amount).signAndSend(wallet, { nonce });
      }
    }
  }
}

module.exports = config