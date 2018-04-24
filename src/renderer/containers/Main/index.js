import React, { Component } from "react";
import mirror, { Route, connect, actions } from "mirrorx";
import PrivateRoute from "../../routes/privateRoute";
import { Layout, message, Icon, Popover, List } from "antd";
import classnames from "classnames";
import MainMenu from "../../components/MainMenu";
import Home from "../../containers/Home";
import Message from "../../containers/Message";
import User from "../../containers/User";
import PicView from "../../components/PicView";
import UserModel from "../../models/User";
import { ipcRenderer as ipc, remote } from "electron";
import { logger } from "../../utils/logger";
import { getToken } from "../../utils/token-storage";
import { HOST_CONCIG } from "../../../main/services/config";
import "./index.less";

const { Header, Footer, Sider, Content } = Layout;
const win = remote.getGlobal("win");
mirror.model(UserModel);

mirror.hook((action, getState) => {
  (async () => {
    const {
      routing: { location },
      auth
    } = getState();
    const token = await getToken();
    if (
      action.type === "@@router/LOCATION_CHANGE" &&
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/"
    ) {
      actions.auth.save({
        login: false,
        token: {}
      });
      message.error("请登录");
      win.loadURL(HOST_CONCIG.local);
    }
  })();
});

ipc.on("weibo::getUserInfo::success", (event, msg) => {
  if (msg) {
    logger("weibo::getUserInfo::success", msg);
    actions.user.save(msg);
  }
});

ipc.on("weibo::getUserInfo::error", (event, msg) => {
  if (msg) {
    logger("weibo::getUserInfo::error", msg);
  }
  message.error("获取用户信息失败");
});

const SwitchTimeline = ({ tab, handleChange }) => (
  <List
    size="small"
    dataSource={[{ text: "关注", value: 0 }, { text: "好友圈", value: 1 }]}
    renderItem={item => (
      <List.Item
        onClick={handleChange(item.value)}
        className={classnames("timeline-tab", { active: tab === item.value })}
      >
        {item.text}
      </List.Item>
    )}
  />
);

class Main extends Component {
  explainTitle = name => {
    switch (name) {
      case "/main":
        return "查看微博";
      case "/main/home":
        return "查看微博";
      case "/main/message":
        return "消息箱";
      case "/main/user":
        return "我的信息";
    }
  };
  changeTab = tab => () => {
    actions.timeline.save({
      tab
    });
  };
  componentDidMount() {
    actions.user.getUserInfo(this.props.auth.token);
  }
  render() {
    let { location, match } = this.props;
    let { login } = this.props.auth;
    let { tab } = this.props.timeline;
    return (
      <Layout className="main">
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header>
            {/*<span>
              <Icon type="left" />返回
            </span>*/}
            {location.pathname === "/main" ||
            location.pathname === "/main/home" ? (
              <Popover
                placement="bottomLeft"
                content={
                  <SwitchTimeline tab={tab} handleChange={this.changeTab} />
                }
              >
                <Icon type="bars" />
              </Popover>
            ) : null}
            <span>{this.explainTitle(location.pathname)}</span>
            {location.pathname === "/main" ||
            location.pathname === "/main/home" ? (
              <Icon type="reload" />
            ) : null}
          </Header>
          <Content>
            <Route exact path={match.url} component={Home} />
            <PrivateRoute
              path={`${match.url}/home`}
              component={Home}
              login={login}
            />
            <PrivateRoute
              path={`${match.url}/message`}
              component={Message}
              login={login}
            />
            <PrivateRoute
              path={`${match.url}/user`}
              component={User}
              login={login}
            />
            {/*<Route component={NoMatch}/>*/}
          </Content>
        </Layout>
        <PicView />
      </Layout>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  timeline: state.timeline
}))(Main);
