import {
  getNotificationWasClosed,
  getNotificationIsQueued,
} from "components/pageContainer/notifications/selectors";
import { actions as vaultsReportActions } from "components/vaultsReport/slice";
import { takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { errorMessages } from "siteConfig";
import { markAnnouncementAsClosed } from "utils/announcements";
import { actions as notificationActions } from "./slice";

function* handleError(action) {
  // For error notifications, we set the notification id to the action name after the "/".
  const notificationId = action.type.split("/").pop();

  const notificationWasClosed = yield select(getNotificationWasClosed, notificationId);
  const notificationIsQueued = yield select(getNotificationIsQueued, notificationId);

  if (!notificationWasClosed && !notificationIsQueued) {
    yield put(
      notificationActions.queueNotification({
        id: notificationId,
        message: errorMessages[notificationId],
        type: "error",
      })
    );
  }
}

function* handleCloseNotification(action) {
  const { id: notificationId, type: notificationType } = action.payload;
  if (notificationType === "announcement") {
    markAnnouncementAsClosed(notificationId);
  }
}

export default function* notificationsSaga() {
  yield takeEvery(
    [
      vaultsReportActions.fetchVaultsFailure,
      vaultsReportActions.fetchUserHoldingsFailure,
      vaultsReportActions.fetchUserEarningsFailure,
    ],
    handleError
  );

  yield takeEvery(notificationActions.closeNotification, handleCloseNotification);
}
