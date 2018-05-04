import { actions } from "mirrorx";
import { ipcRenderer as ipc } from "electron";

export default {
  name: "favorites",
  initialState: {
    favoritesList: [],
    favorites_page: 1
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
    },
    getFavorites(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getFavorites",
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
    saveFavorites(data, getState) {
      let {
        favorites: { favoritesList, favorites_page }
      } = getState();
      if (!favoritesList) {
        actions.favorites.save({
          favoritesList: data.favorites,
          favorites_page:
            data.favorites.length > 0 ? favorites_page + 1 : favorites_page
        });
      } else {
        favoritesList = [...favoritesList, ...data.favorites];
        actions.favorites.save({
          favoritesList,
          favorites_page:
            data.favorites.length > 0 ? favorites_page + 1 : favorites_page
        });
      }
    },
    updateFavorites(data, getState) {
      let {
        timeline: { home_timeline, user_timeline, bilateral_timeline },
        favorites: { favoritesList }
      } = getState();
      let { status } = data;
      if (home_timeline.statuses) {
        home_timeline.statuses.forEach((item, index, array) => {
          if (item.id === status.id) {
            array[index] = status;
          }
        });
      }
      if (user_timeline.statuses) {
        user_timeline.statuses.forEach((item, index, array) => {
          if (item.id === status.id) {
            array[index] = status;
          }
        });
      }
      if (bilateral_timeline.statuses) {
        bilateral_timeline.statuses.forEach((item, index, array) => {
          if (item.id === status.id) {
            array[index] = status;
          }
        });
      }
      if (favoritesList) {
        favoritesList.forEach((item, index, array) => {
          if (item.status.id === status.id) {
            if (array[index].status.deleted === "1") {
              array.splice(index, 1);
            } else {
              array[index].status = status;
            }
          }
        });
      }
      actions.timeline.save({
        home_timeline,
        user_timeline,
        bilateral_timeline
      });
      actions.favorites.save({
        favoritesList
      });
    }
  }
};
