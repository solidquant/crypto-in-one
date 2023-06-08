const axios = require('axios')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class BybitAPI {
  symbols

  constructor() {
    this.HttpsURL = 'https://api.bybit.com'
  }

  _queryString(params) {
    let qs = ''
    for (const key of Object.keys(params).sort()) {
      qs += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`
    }
    qs = qs.slice(0, -1)
    return qs
  }

  async _getSymbols(baseCoin) {
    let params = {
      baseCoin,
      status: 'Trading',
      category: 'option',
      limit: 1000,
    }
    let qs = this._queryString(params)
    let url = `${this.HttpsURL}/v5/market/instruments-info?${qs}`
    let res = await axios.get(url)
    let data = res.data.result

    let symbols = []

    while (data.list.length >= 1) {
      symbols = symbols.concat(data.list.map((d) => d.symbol))

      await sleep(300)

      params = {
        ...params,
        cursor: data.nextPageCursor,
      }
      qs = this._queryString(params)
      url = `${this.HttpsURL}/v5/market/instruments-info?${qs}`
      res = await axios.get(url)
      data = res.data.result
    }

    return symbols
  }

  async getSymbols() {
    this.symbols = []
    for (const bc of ['BTC', 'ETH']) {
      const bcSymbols = await this._getSymbols(bc)
      this.symbols = this.symbols.concat(bcSymbols)
    }
    return this.symbols
  }
}

exports.default = BybitAPI
