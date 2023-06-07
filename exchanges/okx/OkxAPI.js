const axios = require('axios')

class OkxAPI {
  underlyings = null
  symbols = null

  constructor() {
    this.HttpsURL = 'https://www.okx.com'
  }

  async getUnderlyings() {
    if (this.underlyings == null) {
      const url = `${this.HttpsURL}/api/v5/public/underlying?instType=OPTION`
      const res = await axios.get(url)
      this.underlyings = res.data.data[0]
    }
    return this.underlyings
  }

  async _getSymbols(underlying) {
    const url = `${this.HttpsURL}/api/v5/public/instruments?instType=OPTION&uly=${underlying}`
    const res = await axios.get(url)
    return res.data.data.filter((d) => d.state == 'live').map((d) => d.instId)
  }

  async getSymbols() {
    this.symbols = []
    const underlyings = await this.getUnderlyings()
    for (const u of underlyings) {
      const uSymbols = await this._getSymbols(u)
      this.symbols = this.symbols.concat(uSymbols)
    }
    return this.symbols
  }
}

exports.default = OkxAPI
