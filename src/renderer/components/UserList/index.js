import React, { Component } from "react";
import { Card, Col, Row, Avatar } from "antd";
import { actions, connect } from "mirrorx";
import "./index.less";

const { Meta } = Card;

const UserList = ({ location, friends, followers }) => {
  let list = [];
  let tag = location.state.tag;
  if (tag === "friends") {
    list = friends.users;
  } else if (tag === "followers") {
    list = followers.users;
  }
  return (
    <div className="user-list">
      {list.map((item, index) => (
        <Card key={index}>
          <Meta
            avatar={<Avatar src={item.avatar_large} />}
            title={item.name}
            description={item.description}
          />
        </Card>
      ))}
    </div>
  );
};

export default connect(state => state.user)(UserList);
