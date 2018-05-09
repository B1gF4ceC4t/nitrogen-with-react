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
      comments: [],
      page: 1
    },
    comments: {
      comments: [],
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
    },
    getMentionsFromComments(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getMentionsFromComments",
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
    saveMentionsFromComments(data, getState) {
      let {
        messages: {
          mentionsFromComments: { comments, page }
        }
      } = getState();
      if (!comments || comments.length === 0) {
        actions.messages.save({
          mentionsFromComments: {
            ...data,
            page: data.comments.length > 0 ? page + 1 : page
          }
        });
      } else {
        data.comments = [...comments, ...data.comments];
        actions.messages.save({
          mentionsFromComments: {
            ...data,
            page: data.comments.length > 0 ? page + 1 : page
          }
        });
      }
    },
    receiveComments(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "receiveComments",
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
    saveComments(data, getState) {
      let {
        messages: {
          comments: { comments, page }
        }
      } = getState();
      if (!comments || comments.length === 0) {
        actions.messages.save({
          comments: {
            ...data,
            page: data.comments.length > 0 ? page + 1 : page
          }
        });
      } else {
        data.comments = [...comments, ...data.comments];
        actions.messages.save({
          comments: {
            ...data,
            page: data.comments.length > 0 ? page + 1 : page
          }
        });
      }
    }
  }
};
