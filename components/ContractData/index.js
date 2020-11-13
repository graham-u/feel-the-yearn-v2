import { find } from "lodash";
import useContractData from "utils/useContractData";

const defaultNotReadyComponent = <span>Not ready</span>;
const defaultErrorComponent = <span>Error</span>;

function ContractData({
  contractConfigs,
  notReadyComponent,
  errorComponent,
  render,
}) {
  console.log("in ContractData");
  notReadyComponent = notReadyComponent ?? defaultNotReadyComponent;
  errorComponent = errorComponent ?? defaultErrorComponent;

  // Yes, ideally hooks should not be used inside loops...
  // This is a good rule to protect against changes in hook ordering and number
  // of hooks. However in this case the number and ordering of hooks will always
  // be consistent as long contractConfigs array is consistent between calls,
  // which is a safe assumption.

  // This approach enables rendering components via a render prop, that
  // dynamically update based on fresh data from multiple contract calls, that
  // can all share default notReady / error components for consistency.
  const contractsData = contractConfigs.map(
    ({ contractKey, method, methodArgs }) =>
      useContractData(contractKey, method, methodArgs)
  );

  // When contractData results are in error state, we show the error component.
  if (find(contractsData, (contractData) => contractData.error)) {
    return errorComponent;
  }

  // When any contractData results are not ready, we show the not ready component.
  if (find(contractsData, (contractData) => contractData.ready === false)) {
    return notReadyComponent;
  }

  // Otherwise call the render prop function passing in the contract data results.
  const result = contractsData.map((contractData) => contractData.result);
  return render(...result);
}

export default ContractData;
