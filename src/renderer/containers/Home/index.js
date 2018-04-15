import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { Spin, message, BackTop } from "antd";
import { ipcRenderer as ipc } from "electron";
import TimeLineModel from "../../models/TimeLine";
import { logger } from "../../utils/logger";
import "./index.less";

ipc.on("weibo::getHomeTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::success", msg);
    actions.timeline.save({
      home_timeline: msg,
      loading: false
    });
  }
});

ipc.on("weibo::getHomeTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::error", msg);
  }
  actions.timeline.save({
    loading: false
  });
  message.error("获取微博失败");
});

mirror.model(TimeLineModel);

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    actions.timeline.save({
      loading: true
    });
    actions.timeline.getHomeTimeLine(this.props.auth.token);
  }
  render() {
    let { timeline } = this.props;
    return (
      <div className="home">
        <Spin tip="加载中..." spinning={timeline.loading} delay={500}>
          <BackTop />
          <div>home</div>
        </Spin>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  timeline: state.timeline
}))(Home);
