import React, { Component } from "react";
import { actions } from "mirrorx";
import { List, Icon, Avatar } from "antd";
import "./index.less";

const data = [
  {
    pathname: "/main/message/mention/statuse",
    tag: 0,
    text: "@我的微博",
    icon: require("static/message-0.png")
  },
  {
    pathname: "/main/message/mention/comment",
    tag: 1,
    text: "@我的评论",
    icon: require("static/message-1.png")
  },
  {
    pathname: "/main/message/comment",
    tag: 2,
    text: "收到的评论",
    icon: require("static/message-2.png")
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
          <List.Item
            onClick={this.switchRoute(item.pathname, item.tag)}
            actions={[<Icon type="right" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.icon} />}
            />
            {item.text}
          </List.Item>
        )}
      />
    );
  }
}

export default MessageList;
