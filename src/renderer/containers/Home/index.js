import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { ipcRenderer as ipc } from "electron";
import TimeLineModel from "../../models/TimeLine";
import { logger } from "../../utils/logger";
import "./index.less";

ipc.on("weibo::getHomeTimeLine::success", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::success", msg);
    actions.timeline.save({
      home_timeline: msg
    });
  }
});

ipc.on("weibo::getHomeTimeLine::error", (event, msg) => {
  if (msg) {
    logger("weibo::getHomeTimeLine::error", msg);
  }
});

mirror.model(TimeLineModel);

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    actions.timeline.getHomeTimeLine(this.props.auth.token);
  }
  render() {
    return (
      <div className="home">
        <div>home</div>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  timeline: state.timeline
}))(Home);
