import { parseISO, addDays } from "date-fns";
import { isUndefined } from "lodash";
import { announcementDurationInDays } from "siteConfig";

function getAllClosedAnnouncements() {
  try {
    const allClosedAnnouncements = localStorage.getItem("allClosedAnnouncements");
    if (allClosedAnnouncements === null) {
      return {};
    }
    return JSON.parse(allClosedAnnouncements);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function markAnnouncementAsClosed(id) {
  try {
    let allClosedAnnouncements = getAllClosedAnnouncements();
    allClosedAnnouncements[id] = id;
    localStorage.setItem("allClosedAnnouncements", JSON.stringify(allClosedAnnouncements));
  } catch (err) {
    console.log(err);
  }
}

function announcementWasClosed(id) {
  try {
    const allClosedAnnouncements = getAllClosedAnnouncements();
    return !isUndefined(allClosedAnnouncements[id]);
  } catch (err) {
    console.log(err);
    // If we fail to get closed status, assume it was closed so as to not annoy the user.
    return true;
  }
}

function shouldShowAnnouncement({ id, date }) {
  const announcementStartDate = parseISO(date);
  const announcementEndDate = addDays(announcementStartDate, announcementDurationInDays);
  const today = new Date();

  if (today > announcementStartDate && today < announcementEndDate && !announcementWasClosed(id)) {
    return true;
  }
}

export { markAnnouncementAsClosed, announcementWasClosed, shouldShowAnnouncement };
