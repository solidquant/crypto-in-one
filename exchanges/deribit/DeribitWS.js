const WebSocket = require('ws')

class DeribitWS {
  symbols
  queue

  constructor(_queue) {
    this.optionsWsURL = 'wss://www.deribit.com/ws/api/v2'
    this.queue = _queue
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
    const channels = this.symbols.map((s) => `book.${s}.none.10.100ms`)
    this.ws.send(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'public/subscribe',
        params: {
          channels: channels,
        },
      }),
    )
  }

  onMessage(message) {
    this.queue.enqueue(message.toString())
  }

  onClose() {
    console.log('DeribitWS connection closed')
  }

  onError(error) {
    console.log('DeribitWS closed with error: ', error)
  }
}

exports.default = DeribitWS
