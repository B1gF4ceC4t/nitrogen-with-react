import React, { Component } from "react";
import mirror, { Route, actions, connect } from "mirrorx";
import PrivateRoute from "routes/privateRoute";
import { message } from "antd";
import { ipcRenderer as ipc } from "electron";
import { logger } from "utils/logger";
import TimeLine from "components/TimeLine";
import Comment from "components/Comment";
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

ipc.on("weibo::getMentionsFromComments::success", (event, msg) => {
  if (msg) {
    logger("weibo::getMentionsFromComments::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.messages.saveMentionsFromComments(msg);
    }
  }
});

ipc.on("weibo::getMentionsFromComments::error", (event, msg) => {
  if (msg) {
    logger("weibo::getMentionsFromComments::error", msg);
  }
  message.error("获取@我的评论失败");
});

ipc.on("weibo::receiveComments::success", (event, msg) => {
  if (msg) {
    logger("weibo::receiveComments::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.messages.saveComments(msg);
    }
  }
});

ipc.on("weibo::receiveComments::error", (event, msg) => {
  if (msg) {
    logger("weibo::receiveComments::error", msg);
  }
  message.error("获取评论失败");
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
    let list = [];
    if (state.tag === 0) {
      list = messages.mentions.statuses;
    } else if (state.tag === 1) {
      list = messages.mentionsFromComments.comments;
    } else if (state.tag === 2) {
      list = messages.comments.comments;
    }
    return (
      <div className="message-page">
        {state.tag === 0
          ? list.map((item, index) => <TimeLine key={index} data={item} />)
          : list.map((item, index) => <Comment key={index} data={item} />)}
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  messages: state.messages
}))(MessagePage);
