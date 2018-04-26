import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { Icon, Row, Col } from "antd";
import { ipcRenderer as ipc } from "electron";
import TimeLine from "../../components/TimeLine";
import { logger } from "../../utils/logger";
import "./index.less";

ipc.on("weibo::getUserTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getUserTimeline::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.timeline.saveUserTimeLine(msg);
    }
  }
});

ipc.on("weibo::getUserTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::revokeoAuth::error", msg);
  }
  message.error("获取微博失败");
});

class User extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let { auth, user, timeline } = this.props;
    actions.timeline.getUserTimeLine({
      ...auth.token,
      uid: user.id,
      page: timeline.user_page
    });
  }
  render() {
    let { user, timeline } = this.props;
    return (
      <div className="user">
        <div
          className="user-brief"
          style={{ backgroundImage: `url(${user.cover_image_phone})` }}
        >
          <span className="user-brief-name">{user.screen_name}</span>
          {user.gender === "f" ? <Icon type="woman" /> : <Icon type="man" />}
          <Row>
            <Col span={18} offset={3} className="user-brief-count">
              <span>微博 {user.statuses_count}</span>|
              <span>关注 {user.friends_count}</span>|
              <span>粉丝 {user.followers_count}</span>|
              <span>信用 {user.credit_score}</span>
            </Col>
          </Row>
          <div>
            简介：{user.description !== " "
              ? user.description
              : "这个人很懒，什么都没有留下"}
          </div>
          <div>城市：{user.location}</div>
          <div>注册日期：{new Date(user.created_at).toLocaleDateString()}</div>
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
