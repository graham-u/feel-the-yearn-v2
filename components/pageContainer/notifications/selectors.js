import { has, find } from "lodash";

const getClosedNotifications = (state) => state.notifications.closedNotifications;

const getNotificationWasClosed = (state, id) => has(getClosedNotifications(state), id);

const getQueuedNotifications = (state) => state.notifications.queuedNotifications;

const getNotificationIsQueued = (state, id) => find(getQueuedNotifications(state), ["id", id]);

export { getNotificationWasClosed, getQueuedNotifications, getNotificationIsQueued };
