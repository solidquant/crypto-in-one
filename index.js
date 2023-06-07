const DeribitWS = require('./exchanges/deribit/DeribitWS').default
const DeribitAPI = require('./exchanges/deribit/DeribitAPI').default
const OkxAPI = require('./exchanges/okx/OkxAPI').default
const OkxWS = require('./exchanges/okx/OkxWS').default

const Queue = require('./utils/Queue').default

;(async () => {
  const api = new OkxAPI()
  const symbols = await api.getSymbols()
  console.log(symbols)

  const btcSymbols = symbols.filter((s) => s.includes('BTC'))

  const q = new Queue()

  const ws = new OkxWS(q)
  ws.streamOrderbook(btcSymbols)

  const processData = () => {
    const item = q.dequeue()

    if (item) {
      const data = JSON.parse(item)
      console.log(data)
      processData()
    } else {
      setTimeout(processData, 10)
    }
  }

  processData()
})()
