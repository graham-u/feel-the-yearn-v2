import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import OfflineBoltOutlinedIcon from "@material-ui/icons/OfflineBoltOutlined";
import IconTip from "components/vaultsReport/iconTip";
import { find } from "lodash";
import React from "react";
import useContractData from "utils/useContractData";

const defaultNotReadyComponent = (
  <IconTip IconComponent={OfflineBoltOutlinedIcon} color="disabled" fontSize="default">
    Contract data unavailable, wallet not connected?
  </IconTip>
);

const defaultErrorComponent = (
  <IconTip IconComponent={ErrorOutlineOutlinedIcon} color="disabled" fontSize="default">
    An error occurred whilst syncing data.
  </IconTip>
);

function ContractData({ contractConfigs, notReadyComponent, errorComponent, render }) {
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
  const contractsData = contractConfigs.map(({ contractKey, method, methodArgs }) =>
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
