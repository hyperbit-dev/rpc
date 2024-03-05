export function getSlice(str: string) {
  return `${str.slice(0, 5)}...${str.slice(str.length - 5, str.length)}`;
}
