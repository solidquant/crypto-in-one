const { Exchange, Symbol } = require('./models').default

const OrderbookParser = {
  Bybit: (data) => {
    console.log(data)
  },
  Deribit: (data) => {},
  Okx: (data) => {},
}

class Orderbook {
  Bybit = {}
  Deribit = {}
  Okx = {}

  constructor() {}

  updateOrderbookData(exchange, data) {
    OrderbookParser[exchange](JSON.parse(data.toString()))
  }
}

exports.default = Orderbook
