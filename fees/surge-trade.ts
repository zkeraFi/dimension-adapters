import { SimpleAdapter } from "../adapters/types"
import { CHAIN } from "../helpers/chains"
import { httpGet } from "../utils/fetchURL"

const fetchVolume = async (timestamp: number) => {
  const res = await httpGet("https://api.surge.trade/stats")
  const fees_pool = res.fees_pool["24hours"]
  const fees_protocol = res.fees_protocol["24hours"]
  const dailyFees = Number(fees_pool) + Number(fees_protocol)
  const dailyRevenue = fees_protocol
  return {
    dailyFees: dailyFees,
    dailyRevenue: dailyRevenue,
    timestamp: timestamp,
  }
}

const adapters: SimpleAdapter = {
  adapter: {
    [CHAIN.RADIXDLT]: {
      fetch: fetchVolume,
      runAtCurrTime: true,
      start: 1680048000,
    }
  }
}
export default adapters
