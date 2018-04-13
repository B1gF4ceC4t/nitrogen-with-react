import React, { Component } from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import MainMenu from "../../components/MainMenu";
import "./index.less";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout className="home">
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
