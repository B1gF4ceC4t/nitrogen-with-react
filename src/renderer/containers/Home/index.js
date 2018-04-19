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
    actions.timeline.saveHomeTimeLine(msg);
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
    return (
      <div>
        <div className="home" ref={(el) => this.home = el}>
          {timeline.home_timeline.statuses
            ? timeline.home_timeline.statuses.map((item, index) => (
                <TimeLine key={index} data={item} />
              ))
            : null}
        </div>
        <BackTop target={()=>this.home} />
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  timeline: state.timeline
}))(Home);
