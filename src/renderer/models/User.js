import { actions } from "mirrorx";
import { ipcRenderer as ipc } from "electron";
import { getToken } from "../utils/token-storage";

export default {
  name: "user",
  initialState: {},
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    getUserInfo(data, getState) {
      if (data) {
        ipc.send("weibo::api", {
          type: "getUserInfo",
          method: "GET",
          data: {
            access_token: data.access_token,
            uid: data.uid
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
