import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "../../main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "timeline",
  initialState: {
    loading: false,
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
            access_token: data.access_token
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    }
  }
};
