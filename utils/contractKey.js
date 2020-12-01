const getContractKey = (prefix, address) => `${prefix}:${address}`;

const getContractAddressFromKey = (contractKey) => contractKey.split(":")[1];

export { getContractKey, getContractAddressFromKey };
