import React, { Component } from "react";
import { withRouter, actions } from "mirrorx";
import { Menu, Icon } from "antd";
import "./index.less";

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }
  switchRoute = url => () => {
    if (url !== this.props.location.pathname) {
      actions.routing.push(url);
    }
  };
  render() {
    let { match: { url }, location } = this.props;
    return (
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
    );
  }
}

export default withRouter(MainMenu);
