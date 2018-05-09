import { actions } from "mirrorx";
import { saveToken, clearToken, getToken } from "utils/token-storage";
import { KEY_CONFIG, HOST_CONCIG } from "main/services/config";
import { ipcRenderer as ipc, remote } from "electron";

const win = remote.getGlobal("win");

export default {
  name: "auth",
  initialState: {
    login: false,
    token: {}
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
    accessToken(data, getState) {
      ipc.send("weibo::api", {
        type: "accessToken",
        method: "POST",
        data: {
          client_id: KEY_CONFIG.app_key,
          client_secret: KEY_CONFIG.app_secret,
          grant_type: "authorization_code",
          code: data,
          redirect_uri: KEY_CONFIG.redirect_uri
        },
        options: {
          form: true
        }
      });
    },
    saveToken(data, getState) {
      saveToken(data);
      actions.auth.save({
        login: true,
        token: JSON.parse(data)
      });
    },
    revokeoAuth(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "revokeoAuth",
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
    },
    clearToken(data, getState) {
      clearToken();
      actions.auth.save(data);
    }
  }
};
