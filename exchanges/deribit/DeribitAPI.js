const axios = require('axios')

class DeribitAPI {
  symbols

  constructor() {
    this.optionsHttpsURL = 'https://www.deribit.com/api/v2'
  }

  _queryString(params) {
    let qs = ''
    for (const [key, value] of Object.entries(params)) {
      qs += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
    }
    qs = qs.slice(0, -1)
    return qs
  }

  async _getSymbols(currency) {
    const params = {
      currency,
      kind: 'option',
      expired: 'false',
    }
    const qs = this._queryString(params)
    const url = `${this.optionsHttpsURL}/public/get_instruments?${qs}`
    const res = await axios.get(url)
    return res.data.result.map((d) => d.instrument_name)
  }

  async getSymbols() {
    this.symbols = []
    for (const c of ['BTC', 'ETH']) {
      const cSymbols = await this._getSymbols(c)
      this.symbols = this.symbols.concat(cSymbols)
    }
    return this.symbols
  }
}

exports.default = DeribitAPI
