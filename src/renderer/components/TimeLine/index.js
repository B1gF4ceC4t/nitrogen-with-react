import React, { Component } from "react";
import { Card, Icon, message } from "antd";
import { remote, ipcRenderer as ipc } from "electron";
import { connect } from "mirrorx";
import * as DateUtils from "../../utils/date-utils";
import * as StringUtils from "../../utils/string-utils";
import { logger } from "../../utils/logger";
import Pics from "../Pics";
import Retweeted from "../Retweeted";
import "./index.less";

const win = remote.getGlobal("win");

ipc.on("weibo::goDetail::success", (event, msg) => {
  if (msg) {
    logger("weibo::goDetail::success", msg);
  }
});

ipc.on("weibo::goDetail::error", (event, msg) => {
  if (msg) {
    logger("weibo::goDetail::error", msg);
  }
  message.error("获取微博页失败");
});

const Emotion = ({ url, width, height }) => (
  <img src={url} width={width} height={height} />
);
class TimeLine extends Component {
  constructor(props) {
    super(props);
  }
  goDetail = id => () => {
    ipc.send("weibo::api", {
      type: "goDetail",
      method: "GET",
      data: {
        access_token: this.props.token.access_token,
        id
      }
    });
  };
  render() {
    let { data } = this.props;
    return (
      <div className="timeline">
        <Card
          hoverable
          actions={[
            <span>
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
          onClick={this.goDetail(data.id)}
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
      </div>
    );
  }
}

export default connect(state => state.auth)(TimeLine);
