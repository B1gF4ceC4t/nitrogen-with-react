import { actions } from "mirrorx";

export default {
  name: "view",
  initialState: {
    showView: false,
    viewUrls: [],
    selectedIndex: 0
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {}
};
