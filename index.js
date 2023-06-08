const DeribitWS = require('./exchanges/deribit/DeribitWS').default
const DeribitAPI = require('./exchanges/deribit/DeribitAPI').default
const OkxAPI = require('./exchanges/okx/OkxAPI').default
const OkxWS = require('./exchanges/okx/OkxWS').default
const BybitAPI = require('./exchanges/bybit/BybitAPI').default

const DataSource = require('./utils/DataSource').default

;(async () => {
  const datasource = new DataSource()
  datasource.on('data', (data) => {
    console.log('From index.js: ', data.toString())
  })

  const deribitAPI = new DeribitAPI()

  const deribitBtcWS1 = new DeribitWS(datasource)
  const deribitBtcWS2 = new DeribitWS(datasource)
  const deribitEthWS1 = new DeribitWS(datasource)
  const deribitEthWS2 = new DeribitWS(datasource)

  const deribitSymbols = await deribitAPI.getSymbols()
  const deribitBtcSymbols = deribitSymbols.filter((s) => s.includes('BTC'))
  const deribitEthSymbols = deribitSymbols.filter((s) => s.includes('ETH'))

  deribitBtcWS1.streamOrderbook(
    deribitBtcSymbols.slice(0, deribitBtcSymbols.length / 2),
  )
  deribitBtcWS2.streamOrderbook(
    deribitBtcSymbols.slice(deribitBtcSymbols.length / 2),
  )

  deribitEthWS1.streamOrderbook(
    deribitEthSymbols.slice(0, deribitEthSymbols.length / 2),
  )
  deribitEthWS2.streamOrderbook(
    deribitEthSymbols.slice(deribitEthSymbols.length / 2),
  )
})()
