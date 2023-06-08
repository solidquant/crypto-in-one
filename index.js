const DeribitWS = require('./exchanges/deribit/DeribitWS').default
const DeribitAPI = require('./exchanges/deribit/DeribitAPI').default
const OkxAPI = require('./exchanges/okx/OkxAPI').default
const OkxWS = require('./exchanges/okx/OkxWS').default
const BybitAPI = require('./exchanges/bybit/BybitAPI').default
const BybitWS = require('./exchanges/bybit/BybitWS').default

const DataSource = require('./utils/DataSource').default
const Orderbook = require('./interfaces/Orderbook').default

;(async () => {
  const o = new Orderbook()

  const datasource = new DataSource()
  datasource.on('data', o.updateOrderbookData)

  const api = new BybitAPI()
  const symbols = await api.getSymbols()

  const btcWs = new BybitWS(datasource)
  const ethWs = new BybitWS(datasource)

  btcWs.streamOrderbook(symbols.filter((s) => s.includes('BTC')))
  ethWs.streamOrderbook(symbols.filter((s) => s.includes('ETH')))

  // const deribitAPI = new DeribitAPI()

  // const deribitBtcWS1 = new DeribitWS(datasource)
  // const deribitBtcWS2 = new DeribitWS(datasource)
  // const deribitEthWS1 = new DeribitWS(datasource)
  // const deribitEthWS2 = new DeribitWS(datasource)

  // const deribitSymbols = await deribitAPI.getSymbols()
  // const deribitBtcSymbols = deribitSymbols.filter((s) => s.includes('BTC'))
  // const deribitEthSymbols = deribitSymbols.filter((s) => s.includes('ETH'))

  // deribitBtcWS1.streamOrderbook(
  //   deribitBtcSymbols.slice(0, deribitBtcSymbols.length / 2),
  // )
  // deribitBtcWS2.streamOrderbook(
  //   deribitBtcSymbols.slice(deribitBtcSymbols.length / 2),
  // )

  // deribitEthWS1.streamOrderbook(
  //   deribitEthSymbols.slice(0, deribitEthSymbols.length / 2),
  // )
  // deribitEthWS2.streamOrderbook(
  //   deribitEthSymbols.slice(deribitEthSymbols.length / 2),
  // )
})()
