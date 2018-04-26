import { actions } from "mirrorx";
import { ipcRenderer as ipc } from "electron";

export default {
  name: "favorites",
  initialState: {
    favoritesList: []
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
    createFavorites(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "createFavorites",
          method: "POST",
          data: {
            access_token: data.access_token,
            id: data.id
          },
          options: {
            form: true,
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    destroyFavorites(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "destroyFavorites",
          method: "POST",
          data: {
            access_token: data.access_token,
            id: data.id
          },
          options: {
            form: true,
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    }
  }
};
