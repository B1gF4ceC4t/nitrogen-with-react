import React from "react";
import { Switch, Route, Redirect, withRouter, connect } from "mirrorx";
import PrivateRoute from "../../routes/privateRoute";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import MainMenu from "../../components/MainMenu";
import Home from "../../containers/Home";
import Message from "../../containers/Message";
import User from "../../containers/User";
import "./index.less";

const Main = ({ location, match, login }) => {
  return (
    <Layout className="main">
      <Sider>
        <MainMenu />
      </Sider>
      <Layout>
        <Header>{location.pathname}</Header>
        <Content>
          <Route
            exact
            path={match.url}
            component={Home}
          />
          <PrivateRoute path={`${match.url}/home`} component={Home} login={login} />
          <PrivateRoute
            path={`${match.url}/message`}
            component={Message}
            login={login}
          />
          <PrivateRoute path={`${match.url}/user`} component={User} login={login} />
          {/*<Route component={NoMatch}/>*/}
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(state => state.auth)(Main);
