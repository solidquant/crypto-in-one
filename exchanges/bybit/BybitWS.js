const WebSocket = require('ws')

const { Exchange } = require('../../interfaces/models').default

class BybitWS {
  symbols
  datasource
  pingInterval

  constructor(_datasource) {
    this.optionsWsURL = 'wss://stream.bybit.com/v5/public/option'
    this.datasource = _datasource
    this.pingInterval = null
  }

  _setSymbols(symbols) {
    this.symbols = symbols
  }

  streamOrderbook(symbols) {
    this._setSymbols(symbols)

    this.ws = new WebSocket(this.optionsWsURL)

    this.ws.on('open', this.onOpen.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
    this.ws.on('close', this.onClose.bind(this))
    this.ws.on('error', this.onError.bind(this))
  }

  onOpen() {
    const args = this.symbols.map((s) => `orderbook.25.${s}`)
    this.ws.send(
      JSON.stringify({
        op: 'subscribe',
        args,
      }),
    )

    this.pingInterval = setInterval(() => {
      this.ws.send(JSON.stringify({ op: 'ping' }))
    }, 10000)
  }

  onMessage(message) {
    this.datasource.emit('data', Exchange.Bybit, message)
  }

  onClose() {
    console.log('BybitWS connection closed')
    clearInterval(this.pingInterval)
  }

  onError(error) {
    console.log('BybitWS closed with error: ', error)
    clearInterval(this.pingInterval)
  }
}

exports.default = BybitWS
