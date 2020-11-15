// The useContractData hook is used by the ContractData component to fetch and
// keep in sync contract data. Once the ContractData component has mounted we
// drizzle contracts' cacheCall method to initialize the data fetch and store
// the results dataKey in state.
//
// We then create a selector function unique to this component that has
// closure references to the contractKey, method and dataKey, that is used to
// ensure the component re-renders when the data changes.  The selector funciton
// is stored as a ref so that it persists between renders.
//
// Due to the rules of hooks, we cannot selectively store the dataKey and
// selector function only once they are ready, so before the component mounts,
// we set the dataKey to null and the selector to a dummy function.

import { getContractsAddedToDrizzle } from "components/vaultsReport/selectors";
import { has } from "lodash";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

// This factory function returns a selector function specific to the
// ContractData component in which it is called, the returned selector function
// keeps references to the contractKey, method, dataKey params passed in.
const makeContractDataSelector = (contractKey, method, dataKey) => {
  return (state) => {
    if (!has(state, ["contracts", contractKey, method, dataKey])) {
      // The contract data has not yet been fetched and stored.  Once is has
      // this selector will be re-run to return the actual data.
      return null;
    }

    return state.contracts[contractKey][method][dataKey];
  };
};

function useContractData(contractKey, method, methodArgs = []) {
  // Selector function initially set to a dummy function until the component
  // mounts and creates it correctly with the established dataKey.
  const contractDataSelector = useRef(() => null);

  // This is used in useEffect to run the effect again once the selector has
  // been set up.
  const [contractDataSelectorReady, setContractDataSelectorReady] = useState(
    false
  );
  const contractsAddedToDrizzle = useSelector(getContractsAddedToDrizzle);

  const [dataKey, setDataKey] = useState(null);

  const contractData = useSelector(contractDataSelector.current);

  useEffect(() => {
    if (contractsAddedToDrizzle && !contractDataSelectorReady) {
      const dataKey = drizzle.contracts[contractKey].methods[method].cacheCall(
        ...methodArgs
      );
      setDataKey(dataKey);

      contractDataSelector.current = makeContractDataSelector(
        contractKey,
        method,
        dataKey
      );

      setContractDataSelectorReady(true);
    }
  }, [
    contractsAddedToDrizzle,
    contractKey,
    method,
    methodArgs,
    contractDataSelectorReady,
  ]);

  const response = {
    result: null,
    status: null,
    ready: false,
    error: false,
  };

  if (!contractsAddedToDrizzle) {
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
