import { actions } from "mirrorx";
import { ipcRenderer as ipc } from "electron";

export default {
  name: "messages",
  initialState: {
    mentions: {
      statuses: [],
      page: 1
    },
    mentionsFromComments: {
      statuses: [],
      page: 1
    },
    comments: {
      statuses: [],
      page: 1
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
    getMentions(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getMentions",
          method: "GET",
          data: {
            access_token: data.access_token,
            count: data.count,
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
    saveMentions(data, getState) {
      let {
        messages: {
          mentions: { statuses, page }
        }
      } = getState();
      if (!statuses || statuses.length === 0) {
        actions.messages.save({
          mentions: {
            ...data,
            page: data.statuses.length > 0 ? page + 1 : page
          }
        });
      } else {
        data.statuses = [...statuses, ...data.statuses];
        actions.messages.save({
          mentions: {
            ...data,
            page: data.statuses.length > 0 ? page + 1 : page
          }
        });
      }
    }
  }
};
