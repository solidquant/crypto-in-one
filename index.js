const DeribitWS = require("./exchanges/deribit/DeribitWS").default;
const DeribitAPI = require("./exchanges/deribit/DeribitAPI").default;

(async () => {
  const api = new DeribitAPI();
  const symbols = await api.getSymbols("BTC");

  const btcSymbols = symbols.filter((s) => s.includes("BTC"));

  const ws = new DeribitWS();
  ws.streamOrderbook(btcSymbols);
})();
