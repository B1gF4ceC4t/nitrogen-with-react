import React, { Component } from "react";
import { Card, Icon, message } from "antd";
import { ipcRenderer as ipc } from "electron";
import { connect, actions } from "mirrorx";
import * as DateUtils from "../../utils/date-utils";
import * as StringUtils from "../../utils/string-utils";
import { logger } from "../../utils/logger";
import CommentSource from "../CommentSource";
import "./index.less";

const Emotion = ({ url, width, height }) => (
  <img src={url} width={width} height={height} />
);

class Comment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { data } = this.props;
    return (
      <div className="comment">
        {data.deleted === "1" ? (
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: StringUtils.formatContent(data.text)
            }}
          />
        ) : (
          <Card hoverable>
            <div>
              <img className="avatar" src={data.user.avatar_large} />
              <div className="user-info">
                <div className="user-name">{data.user.name}</div>
                <span className="created-date">
                  {DateUtils.format(data.created_at)}
                </span>
              </div>
            </div>
            <div
              className="text"
              dangerouslySetInnerHTML={{
                __html: StringUtils.formatContent(data.text)
              }}
            />
            {data.status ? (
              <CommentSource
                status={data.status}
                comment={data.reply_comment ? data.reply_comment : null}
              />
            ) : null}
          </Card>
        )}
      </div>
    );
  }
}

export default connect(state => state.auth)(Comment);
