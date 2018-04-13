import React, { Component } from "react";
import { Link } from "mirrorx";
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
          <Link to="/home">
            <Icon type="home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="star">
          <Link to="/home/message">
            <Icon type="message" />
          </Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to="/home/user">
            <Icon type="user" />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
