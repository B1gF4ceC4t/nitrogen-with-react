import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { message } from "antd";
import { ipcRenderer as ipc } from "electron";
import classnames from "classnames";
import TimeLineModel from "../../models/TimeLine";
import { logger } from "../../utils/logger";
import TimeLine from "../../components/TimeLine";
import "./index.less";

mirror.model(TimeLineModel);

ipc.on("weibo::getHomeTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.timeline.saveHomeTimeLine(msg);
    }
  }
});

ipc.on("weibo::getHomeTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::error", msg);
  }
  message.error("获取微博失败");
});

ipc.on("weibo::getBilateralTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getBilateralTimeLine::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.timeline.saveBilateralTimeLine(msg);
    }
  }
});

ipc.on("weibo::getBilateralTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getBilateralTimeLine::error", msg);
  }
  message.error("获取微博失败");
});

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let { auth, timeline } = this.props;
    actions.timeline.getHomeTimeLine({
      ...auth.token,
      page: 1,
      count: 30
    });
  }
  render() {
    let { timeline } = this.props;
    return (
      <div className="home">
        <div
          className={classnames("timeline-tab", {
            active: timeline.tab === 0
          })}
        >
          {timeline.home_timeline.statuses
            ? timeline.home_timeline.statuses.map((item, index) => (
                <TimeLine key={index} data={item} />
              ))
            : null}
        </div>
        <div
          className={classnames("timeline-tab", {
            active: timeline.tab === 1
          })}
        >
          {timeline.bilateral_timeline.statuses
            ? timeline.bilateral_timeline.statuses.map((item, index) => (
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
  timeline: state.timeline
}))(Home);
