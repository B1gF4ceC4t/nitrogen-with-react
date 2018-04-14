import React, { Component } from "react";
import { withRouter, actions, connect } from "mirrorx";
import { Menu, Icon, Avatar, Tooltip } from "antd";
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
    let { match: { url }, location, user } = this.props;
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
      </div>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user }))(MainMenu));
