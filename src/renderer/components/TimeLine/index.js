import React, { Component } from "react";
import { Card, Icon } from "antd";
import * as DateUtils from "../../utils/date-utils";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

const Emotion = ({ url, width, height }) => (
  <img src={url} width={width} height={height} />
);
class TimeLine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { data } = this.props;
    return (
      <div className="timeline">
        <Card
          hoverable
          actions={[
            <span>
              <Icon type="star-o" />收藏
            </span>,
            <span>
              <Icon type="export" />
              {data.reposts_count}
            </span>,
            <span>
              <Icon type="message" />
              {data.comments_count}
            </span>,
            <span>
              <Icon type="heart-o" />
              {data.attitudes_count}
            </span>
          ]}
        >
          <div>
            <img className="avatar" src={data.user.avatar_large} />
            <span className="user-name">{data.user.name}</span>
            <div>
              <span
                className="source"
                dangerouslySetInnerHTML={{
                  __html: StringUtils.formatDangerousContent(data.source)
                }}
              />
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
          {/*<Icon type="like-o" />
          <Icon type="like" />
          <Icon type="heart" />
          <Icon type="heart-o" />
          <Icon type="star" />
          <Icon type="star-o" />*/}
        </Card>
      </div>
    );
  }
}

export default TimeLine;
