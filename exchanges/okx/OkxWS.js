const WebSocket = require('ws')

class OkxWS {
  symbols
  datasource

  constructor(_datasource) {
    this.WsURL = 'wss://ws.okx.com:8443/ws/v5/public'
    this.datasource = _datasource
  }

  _setSymbols(symbols) {
    this.symbols = symbols
  }

  streamOrderbook(symbols) {
    this._setSymbols(symbols)

    this.ws = new WebSocket(this.WsURL)

    this.ws.on('open', this.onOpen.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
    this.ws.on('close', this.onClose.bind(this))
    this.ws.on('error', this.onError.bind(this))
  }

  onOpen() {
    const args = []
    for (const s of this.symbols) {
      args.push({
        channel: 'books5',
        instId: s,
      })
    }

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
    console.log('OkxWS connection closed')
  }

  onError(error) {
    console.log('OkxWS closed with error: ', error)
  }
}

exports.default = OkxWS
