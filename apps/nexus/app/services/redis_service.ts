import redis from '@adonisjs/redis/services/main'

export default class RedisService {
  static async getMarketData(name: string[]) {
    const key = `market:${name}:latest`
    const data = await redis.get(key)
    if (!data) {
      const res = (await fetch(
        `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=1&interval=daily`
      ).then((res) => res.json())) as any
      if (res.error) {
        throw new Error(res.error)
      }
      const price = res.prices[res.prices.length - 1][1]
      const marketCap = res.market_caps[res.market_caps.length - 1][1]
      const totalVolume = res.total_volumes[res.total_volumes.length - 1][1]
      if (price) {
        redis.set(key, JSON.stringify({ price, marketCap, totalVolume }))
        redis.expire(key, 10 * 6 * 1000)
      }

      return { price, marketCap, totalVolume }
    }
    return JSON.parse(data)
  }

  static getLastEntryPerTime(data: any[] = []) {
    return data.map((entry: any) => {
      const date = new Date(entry[0])
      const unixTimestamp = Math.floor(date.getTime() / 1000)
      return [unixTimestamp, entry[1], entry[2], entry[3], entry[4]]
    })
  }

  static getLastEntryPerDay(data: any[] = []) {
    const dailyData: { [key: string]: any } = {}

    // Group data by day
    data.forEach((entry: any) => {
      const date = new Date(entry[0]).toISOString().split('T')[0]
      dailyData[date] = entry // Store only the last entry for each date
    })

    // Convert dailyData back into an array of entries
    return Object.values(dailyData)
  }

  static async getMarketChart(name: string) {
    const key = `market:${name}:chart`
    const data = await redis.get(key)
    if (!data) {
      const res = (await fetch(
        `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=90`
      ).then((res) => res.json())) as any
      if (res.error) {
        throw new Error(res.error)
      }
      const marketChart = {
        marketCaps: this.getLastEntryPerDay(res.market_caps),
        totalVolumes: this.getLastEntryPerDay(res.total_volumes),
        prices: this.getLastEntryPerDay(res.prices),
      }
      if (marketChart.prices.length) {
        redis.set(key, JSON.stringify(marketChart))
        redis.expire(key, 10 * 6 * 1000)
      }

      return res
    }
    return JSON.parse(data)
  }
}
