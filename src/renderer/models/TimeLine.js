import { actions } from "mirrorx";
import { ipcRenderer as ipc } from "electron";

export default {
  name: "timeline",
  initialState: {
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
        actions.routing.push("/login");
      }
    }
  }
};
