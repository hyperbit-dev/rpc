export function humanReadablePrice(price: number) {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`; // 8 decimal places for small crypto prices
  } else if (price < 1) {
    return `$${price.toFixed(4)}`; // 4 decimal places for mid-range prices
  } else {
    return `$${price.toFixed(2)}`; // 2 decimal places for larger prices
  }
}

export function humanReadableMarketCap(marketCap: number) {
  const units = ["", "K", "M", "B", "T"];
  let index = 0;

  while (marketCap >= 1000 && index < units.length - 1) {
    marketCap /= 1000;
    index++;
  }

  return `$${marketCap.toFixed(2)} ${units[index]}`;
}

export function humanReadableTotalVolume(volume: number) {
  const units = ["", "K", "M", "B", "T"];
  let index = 0;

  while (volume >= 1000 && index < units.length - 1) {
    volume /= 1000;
    index++;
  }

  return `${volume.toFixed(2)} ${units[index]}`;
}
