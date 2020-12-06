import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { getQueuedNotifications } from "components/pageContainer/notifications/selectors";
import { find } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { announcements } from "siteConfig";
import { shouldShowAnnouncement } from "utils/announcements";
import { actions } from "./slice";

const notificationIsQueued = (id, queuedNotifications) => {
  return find(queuedNotifications, ["id", id]);
};

const typeSeverityMap = {
  announcement: "info",
  error: "error",
};

function Notifications() {
  const dispatch = useDispatch();
  const queuedNotifications = useSelector(getQueuedNotifications);

  useEffect(() => {
    announcements.forEach((announcement) => {
      if (
        shouldShowAnnouncement(announcement) &&
        !notificationIsQueued(announcement.id, queuedNotifications)
      ) {
        dispatch(actions.queueNotification({ ...announcement, type: "announcement" }));
      }
    });
  }, []);

  // We only show 1 notification at a time.
  const notification = queuedNotifications[0];

  if (!notification) {
    return null;
  }

  return (
    <Snackbar open={true}>
      <Alert
        onClose={() => dispatch(actions.closeNotification(notification))}
        severity={typeSeverityMap[notification.type]}
      >
        <Typography>{notification.message}</Typography>
      </Alert>
    </Snackbar>
  );
}

export { Notifications };
