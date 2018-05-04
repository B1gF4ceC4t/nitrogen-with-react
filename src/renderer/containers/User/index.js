import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { Icon, Row, Col, message } from "antd";
import { ipcRenderer as ipc } from "electron";
import TimeLine from "../../components/TimeLine";
import { logger } from "../../utils/logger";
import "./index.less";

ipc.on("weibo::getUserTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getUserTimeLine::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.timeline.saveUserTimeLine(msg);
    }
  }
});

ipc.on("weibo::getUserTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getUserTimeLine::error", msg);
  }
  message.error("获取微博失败");
});

ipc.on("weibo::getFriends::success", (event, msg) => {
  if (msg) {
    logger("weibo::getFriends::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.user.saveFriends(msg);
    }
  }
});

ipc.on("weibo::getFriends::error", (event, msg) => {
  if (msg) {
    logger("weibo::getFriends::error", msg);
  }
  message.error("获取关注列表失败");
});

ipc.on("weibo::getFollowers::success", (event, msg) => {
  if (msg) {
    logger("weibo::getFollowers::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.user.saveFollowers(msg);
    }
  }
});

ipc.on("weibo::getFollowers::error", (event, msg) => {
  if (msg) {
    logger("weibo::getFollowers::error", msg);
  }
  message.error("获取粉丝列表失败");
});

class User extends Component {
  constructor(props) {
    super(props);
  }
  showUserList = tag => () => {
    let { auth, user } = this.props;
    if (tag === "friends") {
      actions.user.getFriends({
        ...auth.token,
        uid: user.info.id,
        cursor: user.friends.next_cursor
      });
      actions.routing.push({
        pathname: "/main/friends",
        state: {
          tag
        }
      });
    } else if (tag === "followers") {
      actions.user.getFollowers({
        ...auth.token,
        uid: user.info.id,
        cursor: user.followers.next_cursor
      });
      actions.routing.push({
        pathname: "/main/followers",
        state: {
          tag
        }
      });
    }
  };
  componentWillMount() {
    let { auth, user, timeline } = this.props;
    actions.timeline.getUserTimeLine({
      ...auth.token,
      uid: user.info.id,
      page: 1
    });
  }
  render() {
    let {
      user: { info },
      timeline
    } = this.props;
    return (
      <div className="user">
        <div
          className="user-brief"
          style={{ backgroundImage: `url(${info.cover_image_phone})` }}
        >
          <span className="user-brief-name">{info.screen_name}</span>
          {info.gender === "f" ? <Icon type="woman" /> : <Icon type="man" />}
          <Row>
            <Col span={18} offset={3} className="user-brief-count">
              <span>微博 {info.statuses_count}</span>|
              <span
                onClick={this.showUserList("friends")}
                style={{ cursor: "pointer" }}
              >
                关注 {info.friends_count}
              </span>|
              <span
                onClick={this.showUserList("followers")}
                style={{ cursor: "pointer" }}
              >
                粉丝 {info.followers_count}
              </span>|
              <span>信用 {info.credit_score}</span>
            </Col>
          </Row>
          <div>
            简介：{info.description !== " "
              ? info.description
              : "这个人很懒，什么都没有留下"}
          </div>
          <div>城市：{info.location}</div>
          <div>注册日期：{new Date(info.created_at).toLocaleDateString()}</div>
        </div>
        <div className="user-timeline">
          {timeline.user_timeline.statuses
            ? timeline.user_timeline.statuses.map((item, index) => (
                <TimeLine key={index} data={item} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  user: state.user,
  timeline: state.timeline
}))(User);
