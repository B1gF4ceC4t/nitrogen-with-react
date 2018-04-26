import React, { Component } from "react";
import { Card, Icon, message } from "antd";
import { ipcRenderer as ipc } from "electron";
import mirror, { connect, actions } from "mirrorx";
import FavoritesModel from "../../models/Favorites";
import * as DateUtils from "../../utils/date-utils";
import * as StringUtils from "../../utils/string-utils";
import { logger } from "../../utils/logger";
import Pics from "../Pics";
import Retweeted from "../Retweeted";
import "./index.less";

mirror.model(FavoritesModel);

ipc.on("weibo::createFavorites::success", (event, msg) => {
  if (msg) {
    logger("weibo::createFavorites::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.favorites.updateFavorites(msg);
      message.success("收藏微博成功");
    }
  }
});

ipc.on("weibo::createFavorites::error", (event, msg) => {
  if (msg) {
    logger("weibo::createFavorites::error", msg);
  }
  message.error("收藏微博失败");
});

ipc.on("weibo::destroyFavorites::success", (event, msg) => {
  if (msg) {
    logger("weibo::destroyFavorites::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.favorites.updateFavorites(msg);
      message.success("取消收藏微博成功");
    }
  }
});

ipc.on("weibo::destroyFavorites::error", (event, msg) => {
  if (msg) {
    logger("weibo::destroyFavorites::error", msg);
  }
  message.error("取消收藏微博失败");
});

const Emotion = ({ url, width, height }) => (
  <img src={url} width={width} height={height} />
);
class TimeLine extends Component {
  constructor(props) {
    super(props);
  }
  handleFavorites = favorited => () => {
    if (favorited) {
      this.destroyFavorites();
    } else {
      this.createFavorites();
    }
  };
  createFavorites = () => {
    actions.favorites.createFavorites({
      ...this.props.token,
      id: this.props.data.id
    });
  };
  destroyFavorites = () => {
    actions.favorites.destroyFavorites({
      ...this.props.token,
      id: this.props.data.id
    });
  };
  render() {
    let { data } = this.props;
    return (
      <div className="timeline">
        {data.deleted === "1" ? (
          <Card hoverable>
            <div className="deleted-info">
              <span className="created-date">
                {DateUtils.format(data.created_at)}
              </span>
              <span className="cancel-star" onClick={this.destroyFavorites}>
                取消收藏
              </span>
            </div>
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: StringUtils.formatContent(data.text)
              }}
            />
          </Card>
        ) : (
          <Card
            hoverable
            actions={[
              <span onClick={this.handleFavorites(data.favorited)}>
                {data.favorited ? <Icon type="star" /> : <Icon type="star-o" />}收藏
              </span>,
              <span>
                <Icon type="export" />
                {data.reposts_count === 0
                  ? "转发"
                  : StringUtils.formatNum(data.reposts_count)}
              </span>,
              <span>
                <Icon type="message" />
                {data.comments_count === 0
                  ? "评论"
                  : StringUtils.formatNum(data.comments_count)}
              </span>,
              <span>
                <Icon type="heart-o" />
                {data.attitudes_count === 0
                  ? "点赞"
                  : StringUtils.formatNum(data.attitudes_count)}
              </span>
            ]}
          >
            <div>
              <img className="avatar" src={data.user.avatar_large} />
              <div className="user-info">
                <div className="user-name">{data.user.name}</div>
                <span className="created-date">
                  {DateUtils.format(data.created_at)}
                </span>
                <span
                  className="source"
                  dangerouslySetInnerHTML={{
                    __html: StringUtils.formatDangerousContent(
                      data.source ? `来自 ${data.source}` : ""
                    )
                  }}
                />
              </div>
            </div>
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: StringUtils.formatContent(data.text)
              }}
            />
            {data.pic_urls ? <Pics pic_urls={data.pic_urls} /> : null}
            {data.retweeted_status ? (
              <Retweeted data={data.retweeted_status} />
            ) : null}
          </Card>
        )}
      </div>
    );
  }
}

export default connect(state => state.auth)(TimeLine);
