const WebSocket = require('ws')

class BybitWS {
  symbols
  datasource

  constructor(_datasource) {
    this.optionsWsURL = 'wss://stream.bybit.com/v5/public/option'
    this.datasource = _datasource
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
  }

  onMessage(message) {
    this.datasource.emit('data', message)
  }

  onClose() {
    console.log('BybitWS connection closed')
  }

  onError(error) {
    console.log('BybitWS closed with error: ', error)
  }
}

exports.default = BybitWS
