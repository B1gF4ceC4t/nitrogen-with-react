import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { getToken } from "utils/token-storage";
import { HOST_CONCIG } from "main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "user",
  initialState: {
    info: {},
    friends: {
      users: [],
      next_cursor: 0,
      previous_cursor: 0
    },
    followers: {
      users: [],
      next_cursor: 0,
      previous_cursor: 0
    }
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
    },
    getFriends(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getFriends",
          method: "GET",
          data: {
            access_token: data.access_token,
            uid: data.uid,
            cursor: data.cursor
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    saveFriends(data, getState) {
      let {
        user: { friends }
      } = getState();
      if (friends.users.length > 0) {
        data.users = [...friends.users, ...data.users];
      }
      data.next_cursor =
        data.next_cursor === 0 ? data.users.length : data.next_cursor;
      actions.user.save({
        friends: data
      });
    },
    getFollowers(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getFollowers",
          method: "GET",
          data: {
            access_token: data.access_token,
            uid: data.uid,
            cursor: data.cursor
          },
          options: {
            json: true
          }
        });
      } else {
        win.loadURL(HOST_CONCIG.local);
      }
    },
    saveFollowers(data, getState) {
      let {
        user: { followers }
      } = getState();
      if (followers.users.length > 0) {
        data.users = [...followers.users, ...data.users];
      }
      data.next_cursor =
        data.next_cursor === 0 ? data.users.length : data.next_cursor;
      actions.user.save({
        followers: data
      });
    }
  }
};
