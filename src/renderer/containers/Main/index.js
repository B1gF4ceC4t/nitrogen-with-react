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
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import MainMenu from "../../components/MainMenu";
import Home from "../../containers/Home";
import Message from "../../containers/Message";
import User from "../../containers/User";
import UserModel from "../../models/User";
import { ipcRenderer as ipc } from "electron";
import { logger } from "../../utils/logger";
import "./index.less";

mirror.model(UserModel);

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
});

class Main extends Component {
  explainTitle = (name)=>{
    switch(name){
      case "/main":return "查看微博";
      case "/main/home":return "查看微博";
      case "/main/message":return "消息箱";
      case "/main/user":return "我的信息";
    }
  }
  componentWillMount() {
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
          <Header>{this.explainTitle(location.pathname)}</Header>
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
