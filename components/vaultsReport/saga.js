import strategiesHelperABI from "abi/strategiesHelper.json";
import { keyBy, filter, groupBy, map, pickBy, mapValues } from "lodash";
import { takeEvery, call, put } from "redux-saga/effects";
import web3 from "utils/web3";
import yearn from "utils/yearnSDK";
import { actions } from "./slice";

function* fetchVaults() {
  try {
    let vaults = yield call([yearn.vaults, yearn.vaults.get]);

    // Don't show vaults that have available migrations
    vaults = filter(vaults, (vault) => vault.metadata.migrationAvailable === false);

    // Transform into object keyed by vault address
    vaults = keyBy(vaults, "address");

    yield put(actions.fetchVaultsSuccess({ vaults }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchVaultsFailure());
  }
}

function* fetchUnderlyingTokens() {
  try {
    let tokens = yield call([yearn.vaults, yearn.vaults.tokens]);

    // Transform into object keyed by vault address
    tokens = keyBy(tokens, "address");

    yield put(actions.fetchUnderlyingTokensSuccess({ underlyingTokens: tokens }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUnderlyingTokensFailure());
  }
}

function* fetchUserHoldings(action) {
  const userAddress = action.payload.userAddress;

  try {
    let userHoldings = yield call([yearn.vaults, yearn.vaults.positionsOf], userAddress);

    // Transform into object keyed by vault address.
    userHoldings = keyBy(userHoldings, "assetAddress");

    // Strip out unneeded data.
    userHoldings = mapValues(userHoldings, (holding) => {
      return holding.underlyingTokenBalance;
    });

    yield put(actions.fetchUserHoldingsSuccess({ userHoldings }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserHoldingsFailure());
  }
}

function* fetchUserEarnings(action) {
  const userAddress = action.payload.userAddress;

  try {
    let userEarnings = yield call([yearn.earnings, yearn.earnings.accountAssetsData], userAddress);

    // Transform into object keyed by vault address.
    userEarnings.earningsAssetData = keyBy(userEarnings.earningsAssetData, "assetAddress");

    yield put(actions.fetchUserEarningsSuccess({ userEarnings }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserEarningsFailure());
  }
}

function* fetchStrategies(action) {
  try {
    const strategiesHelperContractAddress = "0xae813841436fe29b95a14ac701afb1502c4cb789";
    const strategiesContract = new web3.eth.Contract(
      strategiesHelperABI,
      strategiesHelperContractAddress
    );

    let strategies = yield call(strategiesContract.methods.assetsStrategies().call);
    let strategyAddresses = yield call(strategiesContract.methods.assetsStrategiesAddresses().call);

    // Tidy up the strategies data returned from assetsStrategies method.
    strategies = map(strategies, (strategy, index) => {
      // Convert strategies to objects from arrays, as they have string keys that get lost when written to redux store
      // as arrays. Also add in address field as its currently missing from assetsStrategies results.
      strategy = Object.assign({}, strategy, { address: strategyAddresses[index] });

      // Remove numeric keys as these just store duplicate data of descriptive keys.
      strategy = pickBy(strategy, (property, propertyKey) => isNaN(propertyKey));
      return strategy;
    });

    strategies = groupBy(strategies, "vault");

    yield put(actions.fetchStrategiesSuccess({ strategies }));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchStrategiesFailure());
  }
}

export default function* vaultsReportSaga() {
  yield takeEvery(actions.fetchVaults, fetchVaults);
  yield takeEvery(actions.fetchUnderlyingTokens, fetchUnderlyingTokens);
  yield takeEvery(actions.fetchUserHoldings, fetchUserHoldings);
  yield takeEvery(actions.fetchUserEarnings, fetchUserEarnings);
  yield takeEvery(actions.fetchStrategies, fetchStrategies);
}
