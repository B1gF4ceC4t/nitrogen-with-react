import React, { Component } from "react";
import mirror, { withRouter, actions, connect } from "mirrorx";
import { Menu, Icon, Avatar, Tooltip, Popconfirm, message, Badge } from "antd";
import { ipcRenderer as ipc, remote } from "electron";
import RemindModel from "../../models/Remind";
import { HOST_CONCIG } from "../../../main/services/config";
import { logger } from "../../utils/logger";
import "./index.less";

const win = remote.getGlobal("win");
mirror.model(RemindModel);

ipc.on("weibo::revokeoAuth::success", (event, msg) => {
  if (msg) {
    logger("weibo::revokeoAuth::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      if (msg.result === "true") {
        actions.auth.clearToken({
          login: false,
          token: {}
        });
        win.loadURL(HOST_CONCIG.local);
      }
    }
  }
});

ipc.on("weibo::revokeoAuth::error", (event, msg) => {
  if (msg) {
    logger("weibo::revokeoAuth::error", msg);
  }
  message.error("退出登录失败");
});

ipc.on("weibo::getUnreadCount::success", (event, msg) => {
  if (msg) {
    logger("weibo::getUnreadCount::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.remind.saveUnreadCount(msg);
    }
  }
});

ipc.on("weibo::getUnreadCount::error", (event, msg) => {
  if (msg) {
    logger("weibo::getUnreadCount::error", msg);
  }
  message.error("获取消息未读数失败");
});

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }
  switchRoute = url => () => {
    if (url !== this.props.location.pathname) {
      actions.routing.push(url);
    }
  };
  signout = () => {
    actions.auth.revokeoAuth(this.props.auth.token);
  };
  getUnreadCount = () => {
    setTimeout(() => {
      actions.remind.getUnreadCount({
        ...this.props.auth.token,
        uid: this.props.user.uid
      });
      this.getUnreadCount();
    }, 60000);
  };
  componentDidMount() {
    this.getUnreadCount();
  }
  render() {
    let {
      match: { url },
      location,
      user,
      remind
    } = this.props;
    return (
      <div className="main-menu">
        <Tooltip placement="right" title={user.name}>
          <Avatar
            size="large"
            icon="user"
            src={user.profile_image_url}
            onClick={this.switchRoute(`${url}/user`)}
          />
        </Tooltip>
        <Menu selectedKeys={[location.pathname]} mode="vertical">
          <Menu.Item key={`${url}/home`}>
            <Badge count={remind.status} overflowCount={999}>
              <Icon type="home" onClick={this.switchRoute(`${url}/home`)} />
            </Badge>
          </Menu.Item>
          <Menu.Item key={`${url}/message`}>
            <Badge
              count={remind.message_flow_follow + remind.message_flow_unfollow}
              overflowCount={999}
            >
              <Icon
                type="message"
                onClick={this.switchRoute(`${url}/message`)}
              />
            </Badge>
          </Menu.Item>
          <Menu.Item key={`${url}/favorites`}>
            <Icon
              type="star-o"
              onClick={this.switchRoute(`${url}/favorites`)}
            />
          </Menu.Item>
          <Menu.Item key={`${url}/user`}>
            <Icon type="user" onClick={this.switchRoute(`${url}/user`)} />
          </Menu.Item>
        </Menu>
        <Tooltip placement="right" title="作者主页，喵～">
          <Icon
            type="github"
            onClick={() => {
              window.open("https://github.com/B1gF4ceC4t");
            }}
          />
        </Tooltip>
        <Popconfirm
          placement="rightBottom"
          title={`确定退出当前账号？`}
          onConfirm={this.signout}
          okText="确定"
          cancelText="取消"
          overlayClassName="signout-popover"
          arrowPointAtCenter={true}
        >
          <Icon type="poweroff" className="signout" />
        </Popconfirm>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    auth: state.auth,
    user: state.user,
    remind: state.remind
  }))(MainMenu)
);
