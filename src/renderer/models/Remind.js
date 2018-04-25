import { actions } from "mirrorx";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "../../main/services/config";

const win = remote.getGlobal("win");

export default {
  name: "remind",
  initialState: {
    addfriends: 0,
    all_cmt: 0,
    all_follower: 0,
    all_mention_cmt: 0,
    all_mention_status: 0,
    attention_cmt: 0,
    attention_follower: 0,
    attention_mention_cmt: 0,
    attention_mention_status: 0,
    badge: 0,
    chat_group_client: 0,
    chat_group_notice: 0,
    chat_group_pc: 0,
    chat_group_total: 0,
    cmt: 0,
    dm: 0,
    double_flow: 0,
    fans_group_unread: 0,
    follower: 0,
    group: 0,
    hot_status: 0,
    invite: 0,
    likeuser: 0,
    mention_cmt: 0,
    mention_status: 0,
    message_flow_agg_at: 0,
    message_flow_agg_attitude: 0,
    message_flow_agg_comment: 0,
    message_flow_agg_repost: 0,
    message_flow_aggr_wild_card: 0,
    message_flow_aggregate: 0,
    message_flow_attitude_unread: 0,
    message_flow_follow: 0,
    message_flow_follow_attitude_unread: 0,
    message_flow_unaggr_wild_card: 0,
    message_flow_unaggregate: 0,
    message_flow_unfollow: 0,
    notice: 0,
    page_friends_to_me: 0,
    pc_viedo: 0,
    photo: 0,
    status: 0,
    status_24unread: 0
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
    getUnreadCount(data, getState) {
      if (data.access_token) {
        ipc.send("weibo::api", {
          type: "getUnreadCount",
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
    saveUnreadCount(data, getState) {
      actions.remind.save(data);
    }
  }
};
