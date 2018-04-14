import { actions } from "mirrorx";
import { saveToken, clearToken, getToken } from "../utils/token-storage";
import { KEY_CONFIG } from "../../main/services/config";
import { ipcRenderer } from "electron";

const ipc = ipcRenderer;

export default {
  name: "auth",
  initialState: {
    login: getToken()?true:false
  },
  reducers: {
    save (state, data) {
      return {
        ...state,
        ...data
      }
    }
  },
  effects: {
    accessToken (data, getState) {
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
    saveToken (data, getState) {
      saveToken(data);
      actions.auth.save({
        login: true
      });
    }
  }
};
