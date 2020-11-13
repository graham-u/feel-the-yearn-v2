function getNormalizedBalance(balance, decimals) {
  return balance / 10 ** decimals;
}

export default getNormalizedBalance;
