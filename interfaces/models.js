const Exchange = {
  Deribit: 'Deribit',
  Bybit: 'Bybit',
  Okx: 'Okx',
}
Object.freeze(Exchange)

class Symbol {
  constructor(exchange, symbol) {
    this.exchange = exchange
    this.symbol = symbol
  }

  toCommon() {}
}

exports.default = {
  Exchange,
  Symbol,
}
