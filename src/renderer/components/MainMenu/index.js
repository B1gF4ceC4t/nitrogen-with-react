import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./index.less";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "home"
    };
  }
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="vertical"
      >
        <Menu.Item key="home">
          <Icon type="home" />
        </Menu.Item>
        <Menu.Item key="star">
          <Icon type="star-o" />
        </Menu.Item>
        <Menu.Item key="user">
          <Icon type="user" />
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
