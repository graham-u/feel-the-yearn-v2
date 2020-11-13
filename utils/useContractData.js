import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { isEmpty, has } from "lodash";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const makeContractDataSelector = (contractKey, method, dataKey) => {
  return (state) => {
    if (dataKey === null) {
      return null;
    }

    if (!has(state, ["contracts", contractKey, method, dataKey])) {
      return null;
    }

    return state.contracts[contractKey][method][dataKey];
  };
};

function useContractData(contractKey, method, methodArgs = []) {
  const contractDataSelector = useRef(() => null);
  const [dataKey, setDataKey] = useState(null);
  const contractData = useSelector(contractDataSelector.current);
  const drizzleInitialized = useSelector(getDrizzleInitialized);

  const contractsReady =
    drizzleInitialized &&
    has(drizzle, "contracts") &&
    !isEmpty(drizzle.contracts);

  useEffect(() => {
    if (contractsReady) {
      const dataKey = drizzle.contracts[contractKey].methods[method].cacheCall(
        ...methodArgs
      );
      setDataKey(dataKey);

      contractDataSelector.current = makeContractDataSelector(
        contractKey,
        method,
        dataKey
      );
    }
  }, [contractsReady, contractKey, method, methodArgs]);

  const response = {
    result: null,
    status: null,
    ready: false,
    error: false,
  };

  if (!contractsReady) {
    return {
      ...response,
      status: "Data not yet available",
    };
  }

  if (dataKey === null) {
    return {
      ...response,
      status: "Waiting for component to mount then will set data key",
    };
  }

  if (contractData === null) {
    return {
      ...response,
      status: `Waiting to populate data into datakey:  ${dataKey}`,
    };
  }

  if (contractData.error) {
    return {
      ...response,
      status: `Error:  ${methodState[dataKey].error}`,
      error: true,
    };
  }

  return {
    ...response,
    result: contractData.value,
    ready: true,
    status: "ok",
  };
}

export default useContractData;
