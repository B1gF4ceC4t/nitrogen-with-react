import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "timeline",
  initialState: {
    tab: 0,
    home_page: 1,
    home_timeline: {},
    user_page: 1,
    user_timeline: {},
    bilateral_page: 1,
    bilateral_timeline: {}
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    getHomeTimeLine(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getHomeTimeLine",
          method: "GET",
          data: {
            access_token: data.access_token,
            page: data.page,
            count: data.count
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    saveHomeTimeLine(data, getState) {
      let {
        timeline: { home_timeline, home_page }
      } = getState();
      if (!home_timeline.statuses || home_timeline.statuses.length === 0) {
        actions.timeline.save({
          home_timeline: data,
          home_page: data.statuses.length > 0 ? home_page + 1 : home_page
        });
      } else {
        home_timeline.statuses = [...home_timeline.statuses, ...data.statuses];
        actions.timeline.save({
          home_timeline,
          home_page: data.statuses.length > 0 ? home_page + 1 : home_page
        });
      }
    },
    getUserTimeLine(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getUserTimeLine",
          method: "GET",
          data: {
            access_token: data.access_token,
            uid: data.uid,
            page: data.page
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    saveUserTimeLine(data, getState) {
      let {
        timeline: { user_timeline, user_page }
      } = getState();
      if (!user_timeline.statuses || user_timeline.statuses.length === 0) {
        actions.timeline.save({
          user_timeline: data,
          user_page: data.statuses.length > 0 ? user_page + 1 : user_page
        });
      } else {
        user_timeline.statuses = [...user_timeline.statuses, ...data.statuses];
        actions.timeline.save({
          user_timeline,
          user_page: data.statuses.length > 0 ? user_page + 1 : user_page
        });
      }
    },
    getBilateralTimeLine(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getBilateralTimeLine",
          method: "GET",
          data: {
            access_token: data.access_token,
            page: data.page,
            count: data.count
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    saveBilateralTimeLine(data, getState) {
      let {
        timeline: { bilateral_timeline, bilateral_page }
      } = getState();
      if (
        !bilateral_timeline.statuses ||
        bilateral_timeline.statuses.length === 0
      ) {
        actions.timeline.save({
          bilateral_timeline: data,
          bilateral_page:
            data.statuses.length > 0 ? bilateral_page + 1 : bilateral_page
        });
      } else {
        bilateral_timeline.statuses = [
          ...bilateral_timeline.statuses,
          ...data.statuses
        ];
        actions.timeline.save({
          bilateral_timeline,
          bilateral_page:
            data.statuses.length > 0 ? bilateral_page + 1 : bilateral_page
        });
      }
    }
  }
};
