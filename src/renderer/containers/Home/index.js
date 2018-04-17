import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { message, BackTop } from "antd";
import { ipcRenderer as ipc } from "electron";
import TimeLineModel from "../../models/TimeLine";
import { logger } from "../../utils/logger";
import TimeLine from "../../components/TimeLine";
import "./index.less";

ipc.on("weibo::getHomeTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::success", msg);
    actions.timeline.saveTimeline(msg);
  }
});

ipc.on("weibo::getHomeTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::error", msg);
  }
  message.error("获取微博失败");
});

mirror.model(TimeLineModel);

class Home extends Component {
  constructor(props) {
    super(props);
    this.home = null;
    this.setRef = element => {
      this.home = element;
    };
    this.findRef = () => {
      console.log(this.home);
      if (this.home) {
        return this.home;
      }
      return () => window;
    };
  }
  componentDidMount() {
    let { auth, timeline } = this.props;
    actions.timeline.getHomeTimeLine({
      ...auth.token,
      page: timeline.home_page,
      count: 30
    });
  }
  render() {
    let { timeline } = this.props;
    // timeline.home_timeline = {
    //   statuses: [
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     },
    //     {
    //       created_at: "Tue May 31 17:46:55 +0800 2011",
    //       id: 11488058246,
    //       text: "求关注。",
    //       source: "<a href='http://weibo.com' rel='nofollow'>新浪微博</a>",
    //       favorited: false,
    //       truncated: false,
    //       in_reply_to_status_id: "",
    //       in_reply_to_user_id: "",
    //       in_reply_to_screen_name: "",
    //       geo: null,
    //       mid: "5612814510546515491",
    //       reposts_count: 8,
    //       comments_count: 9,
    //       attitudes_count: 13,
    //       annotations: [],
    //       user: {
    //         id: 1404376560,
    //         screen_name: "zaku",
    //         name: "zaku",
    //         province: "11",
    //         city: "5",
    //         location: "北京 朝阳区",
    //         description: "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    //         url: "http://blog.sina.com.cn/zaku",
    //         profile_image_url: "http://tp1.sinaimg.cn/1404376560/50/0/1",
    //         domain: "zaku",
    //         gender: "m",
    //         followers_count: 1204,
    //         friends_count: 447,
    //         statuses_count: 2908,
    //         favourites_count: 0,
    //         created_at: "Fri Aug 28 00:00:00 +0800 2009",
    //         following: false,
    //         allow_all_act_msg: false,
    //         remark: "",
    //         geo_enabled: true,
    //         verified: false,
    //         allow_all_comment: true,
    //         avatar_large: "http://tp1.sinaimg.cn/1404376560/180/0/1",
    //         verified_reason: "",
    //         follow_me: false,
    //         online_status: 0,
    //         bi_followers_count: 215
    //       }
    //     }
    //   ],
    //   ad: [
    //     {
    //       id: 3366614911586452,
    //       mark: "AB21321XDFJJK"
    //     }
    //   ],
    //   previous_cursor: 0, // 暂未支持
    //   next_cursor: 11488013766, // 暂未支持
    //   total_number: 81655
    // };
    return (
      <div>
        
        <div className="home" ref={this.setRef}>
          {timeline.home_timeline.statuses
            ? timeline.home_timeline.statuses.map((item, index) => (
                <TimeLine key={index} data={item} />
              ))
            : null}
            
        </div>
        <BackTop target={this.findRef} visibilityHeight={10}/>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  timeline: state.timeline
}))(Home);
