import React, { Component } from "react";
import mirror, { Route, actions, connect } from "mirrorx";
import PrivateRoute from "../../routes/privateRoute";
import { message } from "antd";
import { ipcRenderer as ipc } from "electron";
import { logger } from "../../utils/logger";
import TimeLine from "../TimeLine";
import "./index.less";

ipc.on("weibo::getMentions::success", (event, msg) => {
  if (msg) {
    logger("weibo::getMentions::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.messages.saveMentions(msg);
    }
  }
});

ipc.on("weibo::getMentions::error", (event, msg) => {
  if (msg) {
    logger("weibo::getMentions::error", msg);
  }
  message.error("获取@我的微博失败");
});

class MessagePage extends Component {
  getStatuses = tag => {
    if (tag === 0) {
      let { auth } = this.props;
      actions.messages.getMentions({
        ...auth.token,
        page: 1,
        count: 30
      });
    } else if (tag === 1) {
      let { auth } = this.props;
      actions.messages.getMentionsFromComments({
        ...auth.token,
        page: 1,
        count: 30
      });
    } else if (tag === 2) {
      let { auth } = this.props;
      actions.messages.receiveComments({
        ...auth.token,
        page: 1,
        count: 30
      });
    }
  };
  componentWillMount() {
    let {
      location: { state }
    } = this.props;
    this.getStatuses(state.tag);
  }
  render() {
    let {
      location: { state },
      match,
      auth: { login },
      messages
    } = this.props;
    let statuses = [];
    if (state.tag === 0) {
      statuses = messages.mentions.statuses;
    } else if (state.tag === 1) {
      statuses = messages.mentionsFromComments.statuses;
    } else if (state.tag === 2) {
      statuses = messages.comments.statuses;
    }
    return (
      <div className="message-page">
        {statuses.map((item, index) => <TimeLine key={index} data={item} />)}
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  messages: state.messages
}))(MessagePage);
