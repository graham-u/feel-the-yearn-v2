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

import {
  getFinishedAddingContractsToDrizzle,
  getContractsMissingFromDrizzle,
} from "components/vaultsReport/selectors";
import { actions } from "components/vaultsReport/slice";
import { has } from "lodash";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

const startSyncingContractData = (contractKey, method, methodArgs) => {
  if (!has(drizzle, ["contracts", contractKey])) {
    throw `Could not set up syncing for contract ${contractKey}, contract missing from drizzle`;
  }

  const dataKey = drizzle.contracts[contractKey].methods[method].cacheCall(...methodArgs);
  return dataKey;
};

const makeContractDataSelector = (contractKey, method, dataKey) => {
  // When called before contract syncing is set up, return a dummy selector that returns null
  if (dataKey === null) {
    return () => null;
  }

  // Return a selector function specific to the ContractData component in which it is called.
  // The returned selector function keeps references to the contractKey, method, dataKey params.
  return function (state) {
    if (!has(state, ["contracts", contractKey, method, dataKey])) {
      // The contract data has not yet been fetched and stored.  Once is has
      // this selector will be re-run to return the actual data.
      return null;
    }

    return state.contracts[contractKey][method][dataKey];
  };
};

function useContractData(contractKey, method, methodArgs = []) {
  const dispatch = useDispatch();

  // This is used in useEffect to run the effect again once the selector has been set up.
  const [contractDataSelectorReady, setContractDataSelectorReady] = useState(false);
  const finishedAddingContractsToDrizzle = useSelector(getFinishedAddingContractsToDrizzle);

  // Sometimes drizzles contracts fail to populate. When we  find this we record it in the store
  // so that we don't try to run the effect for every other component.
  const contractsMissingFromDrizzle = useSelector(getContractsMissingFromDrizzle);

  const [dataKey, setDataKey] = useState(null);

  const contractDataSelector = useMemo(
    () => makeContractDataSelector(contractKey, method, dataKey),
    [dataKey]
  );

  const contractData = useSelector((state) =>
    contractDataSelector(state, contractKey, method, dataKey)
  );

  useEffect(() => {
    if (
      finishedAddingContractsToDrizzle &&
      !contractsMissingFromDrizzle &&
      !contractDataSelectorReady
    ) {
      try {
        const dataKey = startSyncingContractData(contractKey, method, methodArgs);
        setDataKey(dataKey);
        setContractDataSelectorReady(true);
      } catch (e) {
        console.log(`Tried to create datakey but drizzle.contracts['${contractKey}'] is missing`);
        console.log(e);
        dispatch(actions.foundContractsMissingFromDrizzle());
      }
    }
  }, [
    finishedAddingContractsToDrizzle,
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

  if (!finishedAddingContractsToDrizzle) {
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
      status: `Error:  ${contractData.error}`,
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
