import React, { Component } from "react";
import mirror, {
  Switch,
  Route,
  Redirect,
  withRouter,
  connect,
  actions
} from "mirrorx";
import PrivateRoute from "../../routes/privateRoute";
import { Layout, message, Icon } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import MainMenu from "../../components/MainMenu";
import Home from "../../containers/Home";
import Message from "../../containers/Message";
import User from "../../containers/User";
import UserModel from "../../models/User";
import { ipcRenderer as ipc, remote } from "electron";
import { logger } from "../../utils/logger";
import { getToken } from "../../utils/token-storage";
import { HOST_CONCIG } from "../../../main/services/config";
import "./index.less";

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
  componentDidMount() {
    actions.user.getUserInfo(this.props.token);
  }
  render() {
    let { location, match, login } = this.props;
    return (
      <Layout className="main">
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header>
            <span>{this.explainTitle(location.pathname)}</span>
            <Icon type="reload" />
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
      </Layout>
    );
  }
}

export default connect(state => state.auth)(Main);
