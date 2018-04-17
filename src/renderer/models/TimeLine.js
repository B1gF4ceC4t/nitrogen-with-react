import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "../../main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "timeline",
  initialState: {
    home_page: 1,
    home_timeline: {}
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
      if (data) {
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
    saveTimeline(data, getState) {
      let {
        timeline: { home_timeline }
      } = getState();
      if (!home_timeline.statuses) {
        actions.timeline.save({
          home_timeline: data
        });
      } else {
        home_timeline.statuses = [...home_timeline.statuses, ...data.statuses];
        actions.timeline.save({ home_timeline });
      }
    }
  }
};
