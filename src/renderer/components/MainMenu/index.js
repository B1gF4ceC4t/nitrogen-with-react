import React, { Component } from "react";
import { withRouter, actions, connect } from "mirrorx";
import { Menu, Icon, Avatar, Tooltip, Popconfirm, message } from "antd";
import { ipcRenderer as ipc, remote } from "electron";
import { HOST_CONCIG } from "../../../main/services/config";
import { logger } from "../../utils/logger";
import "./index.less";

const win = remote.getGlobal("win");

ipc.on("weibo::revokeoAuth::success", (event, msg) => {
  if (msg) {
    logger("weibo::revokeoAuth::success", msg);
    if (msg.result === "true") {
      actions.auth.clearToken({
        login: false,
        token: {}
      });
      win.loadURL(HOST_CONCIG.local);
    }
  }
});

ipc.on("weibo::revokeoAuth::error", (event, msg) => {
  if (msg) {
    logger("weibo::revokeoAuth::error", msg);
  }
  message.error("退出登录失败");
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
  render() {
    let {
      match: { url },
      location,
      user
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
            <Icon type="home" onClick={this.switchRoute(`${url}/home`)} />
          </Menu.Item>
          <Menu.Item key={`${url}/message`}>
            <Icon type="message" onClick={this.switchRoute(`${url}/message`)} />
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
  connect(state => ({ auth: state.auth, user: state.user }))(MainMenu)
);
