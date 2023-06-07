const DeribitWS = require('./exchanges/deribit/DeribitWS').default
const DeribitAPI = require('./exchanges/deribit/DeribitAPI').default

const Queue = require('./utils/Queue').default

;(async () => {
  const api = new DeribitAPI()
  const symbols = await api.getSymbols('BTC')

  const btcSymbols = symbols.filter((s) => s.includes('BTC'))

  const q = new Queue()

  const ws = new DeribitWS(q)
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
