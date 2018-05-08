import React, { Component } from "react";
import { actions } from "mirrorx";
import { List } from "antd";
import "./index.less";

const data = [
  {
    pathname: "/main/message/mention/statuse",
    tag: 0,
    text: "@我的"
  },
  {
    pathname: "/main/message/mention/comment",
    tag: 1,
    text: "在评论里@我的"
  },
  {
    pathname: "/main/message/comment",
    tag: 2,
    text: "评论"
  }
];

class MessageList extends Component {
  switchRoute = (pathname, tag) => () => {
    actions.routing.push({
      pathname,
      state: {
        tag
      }
    });
  };
  render() {
    return (
      <List
        className="message-list"
        dataSource={data}
        renderItem={item => (
          <List.Item onClick={this.switchRoute(item.pathname, item.tag)}>
            {item.text}
          </List.Item>
        )}
      />
    );
  }
}

export default MessageList;
