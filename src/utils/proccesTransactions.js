function addAccoutId(arr, accountId) {
  return arr.map((x) => ({ ...x, accountId }));
}

const proceessTransactions = (data) => {
  const proccessedTransactions = [];
  // eslint-disable-next-line guard-for-in
  for (const key in data) {
    const y = addAccoutId(data[key], key);
    proccessedTransactions.push(...y);
  }
  return proccessedTransactions;
};

module.exports = proceessTransactions;
