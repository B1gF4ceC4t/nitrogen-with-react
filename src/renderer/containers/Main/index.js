import React, { Component } from "react";
import mirror, { Route, connect, actions } from "mirrorx";
import PrivateRoute from "../../routes/privateRoute";
import { Layout, message, Icon, Popover, List } from "antd";
import classnames from "classnames";
import MainMenu from "../../components/MainMenu";
import Home from "../../containers/Home";
import Message from "../../containers/Message";
import Favorites from "../../containers/Favorites";
import User from "../../containers/User";
import PicView from "../../components/PicView";
import UserList from "../../components/UserList";
import UserModel from "../../models/User";
import MessagesModel from "../../models/Messages";
import { ipcRenderer as ipc, remote } from "electron";
import { logger } from "../../utils/logger";
import { getToken } from "../../utils/token-storage";
import { HOST_CONCIG } from "../../../main/services/config";
import "./index.less";

const { Header, Footer, Sider, Content } = Layout;
const win = remote.getGlobal("win");

mirror.model(UserModel);
mirror.model(MessagesModel);

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
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.user.save({
        info: msg
      });
    }
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
      case "/main/favorites":
        return "我的收藏";
      case "/main/user":
        return "我的信息";
      case "/main/friends":
        return "我的关注";
      case "/main/followers":
        return "我的粉丝";
    }
  };
  goBack = () => {
    actions.routing.goBack();
  };
  changeTab = tab => () => {
    actions.timeline.save({
      tab
    });
    let { auth, timeline } = this.props;
    if (tab === 1) {
      actions.timeline.getBilateralTimeLine({
        ...auth.token,
        page: 1,
        count: 30
      });
    }
  };
  reload = () => {
    (async () => {
      let {
        auth,
        user,
        timeline: { tab }
      } = this.props;
      if (tab === 0) {
        actions.timeline.save({
          home_timeline: {},
          home_page: 1
        });
        await actions.timeline.getHomeTimeLine({
          ...auth.token,
          page: 1,
          count: 30
        });
      } else if (tab === 1) {
        actions.timeline.save({
          bilateral_timeline: {},
          bilateral_page: 1
        });
        await actions.timeline.getBilateralTimeLine({
          ...auth.token,
          page: 1,
          count: 30
        });
      }
      actions.remind.getUnreadCount({
        ...auth.token,
        uid: user.info.uid
      });
    })();
  };
  loadMoreHome = () => {
    let { auth, timeline } = this.props;
    if (timeline.tab === 0) {
      actions.timeline.getHomeTimeLine({
        ...auth.token,
        page: timeline.home_page,
        count: 30
      });
    } else {
      actions.timeline.getBilateralTimeLine({
        ...auth.token,
        page: timeline.bilateral_page,
        count: 30
      });
    }
  };
  loadMoreFavorites = () => {
    let { auth, favorites } = this.props;
    actions.favorites.getFavorites({
      ...auth.token,
      page: favorites.favorites_page,
      count: 30
    });
  };
  loadMoreMentions = () => {
    let {
      auth,
      messages: { mentions }
    } = this.props;
    actions.messages.getMentions({
      ...auth.token,
      page: mentions.page,
      count: 30
    });
  };
  loadMoreUser = () => {
    let { auth, user, timeline } = this.props;
    actions.timeline.getUserTimeLine({
      ...auth.token,
      uid: user.info.id,
      page: timeline.user_page
    });
  };
  loadMoreFriends = () => {
    let { auth, user } = this.props;
    actions.user.getFriends({
      ...auth.token,
      uid: user.info.id,
      cursor: user.friends.next_cursor
    });
  };
  loadMore = () => {
    switch (this.props.location.pathname) {
      case "/main":
        this.loadMoreHome();
        break;
      case "/main/home":
        this.loadMoreHome();
        break;
      case "/main/message/mention/statuse":
        this.loadMoreMentions();
        break;
      case "/main/favorites":
        this.loadMoreFavorites();
        break;
      case "/main/user":
        this.loadMoreUser();
        break;
      case "/main/friends":
        this.loadMoreFriends();
        break;
      case "/main/followers":
        break;
    }
  };
  scrollBar = () => {
    var a = document.querySelector(".ant-layout-content").clientHeight;
    var b = document.querySelector(".ant-layout-content").scrollTop;
    var c = document.querySelector(".ant-layout-content").scrollHeight;
    if (a + b == c) {
      this.loadMore();
    }
  };
  componentWillMount() {
    actions.user.getUserInfo(this.props.auth.token);
  }
  componentDidMount() {
    document
      .querySelector(".ant-layout-content")
      .addEventListener("scroll", this.scrollBar);
  }
  componentWillUnmount() {
    document
      .querySelector(".ant-layout-content")
      .removeEventListener("scroll", this.scrollBar);
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
            {[
              "/main/friends",
              "/main/followers",
              "/main/message/mention/statuse",
              "/main/message/mention/comment",
              "/main/message/comment"
            ].indexOf(location.pathname) > -1 ? (
              <span className="back" onClick={this.goBack}>
                <Icon type="left" />返回
              </span>
            ) : null}
            {["/main", "/main/home"].indexOf(location.pathname) > -1 ? (
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
            {["/main", "/main/home"].indexOf(location.pathname) > -1 ? (
              <Icon type="reload" onClick={this.reload} />
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
              path={`${match.url}/favorites`}
              component={Favorites}
              login={login}
            />
            <PrivateRoute
              path={`${match.url}/user`}
              component={User}
              login={login}
            />
            <PrivateRoute
              path={`${match.url}/friends`}
              component={UserList}
              login={login}
            />
            <PrivateRoute
              path={`${match.url}/followers`}
              component={UserList}
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
  user: state.user,
  timeline: state.timeline,
  favorites: state.favorites,
  messages: state.messages
}))(Main);
