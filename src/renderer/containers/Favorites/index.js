import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import { message } from "antd";
import { ipcRenderer as ipc } from "electron";
import classnames from "classnames";
import { logger } from "../../utils/logger";
import TimeLine from "../../components/TimeLine";
import "./index.less";

ipc.on("weibo::getFavorites::success", (event, msg) => {
  if (msg) {
    logger("weibo::getFavorites::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.favorites.saveFavorites(msg);
    }
  }
});

ipc.on("weibo::getFavorites::error", (event, msg) => {
  if (msg) {
    logger("weibo::getFavorites::error", msg);
  }
  message.error("获取收藏列表失败");
});

class Favorites extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let { auth, favorites } = this.props;
    actions.favorites.getFavorites({
      ...auth.token,
      page: 1,
      count: 30
    });
  }
  render() {
    let {
      favorites: { favoritesList }
    } = this.props;
    return (
      <div className="favorites">
        {favoritesList
          ? favoritesList.map((item, index) => (
              <TimeLine key={index} data={item.status} />
            ))
          : null}
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  favorites: state.favorites
}))(Favorites);
