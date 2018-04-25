import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { getToken } from "../utils/token-storage";
import { HOST_CONCIG } from "../../main/services/config";

const win = remote.getGlobal("win");

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
      if (data.access_token) {
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
        win.loadURL(HOST_CONCIG.local);
      }
    }
  }
};
