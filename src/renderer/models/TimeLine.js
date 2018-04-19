import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "../../main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "timeline",
  initialState: {
    home_page: 1,
    home_timeline: {},
    user_page: 1,
    user_timeline: {}
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
      if (!home_timeline.statuses) {
        actions.timeline.save({
          home_timeline: data
        });
      } else {
        home_timeline.statuses = [...home_timeline.statuses, ...data.statuses];
        actions.timeline.save({
          home_timeline
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
      if (!user_timeline.statuses) {
        actions.timeline.save({
          user_timeline: data
        });
      } else {
        user_timeline.statuses = [...user_timeline.statuses, ...data.statuses];
        actions.timeline.save({
          user_timeline
        });
      }
    }
  }
};
