import React, { Component } from "react";
import { Card, Icon, Row, Col } from "antd";
import * as DateUtils from "../../utils/date-utils";
import * as StringUtils from "../../utils/string-utils";
import Retweeted from "../Retweeted";
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
              {data.favorited ? <Icon type="star" /> : <Icon type="star-o" />}收藏
            </span>,
            <span>
              <Icon type="export" />
              {data.reposts_count === 0 ? "转发" : data.reposts_count}
            </span>,
            <span>
              <Icon type="message" />
              {data.comments_count === 0 ? "评论" : data.comments_count}
            </span>,
            <span>
              <Icon type="heart-o" />
              {data.attitudes_count === 0 ? "点赞" : data.attitudes_count}
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
          {data.pic_urls ? (
            <Row className="pics" gutter={16}>
              {data.pic_urls.map(
                (item, index, array) =>
                  array.length > 1 ? (
                    <Col span={8} key={index} className="pics-col">
                      <img src={item.thumbnail_pic} />
                    </Col>
                  ) : (
                    <Col span={16} key={index} className="pics-col">
                      <img src={item.thumbnail_pic} />
                    </Col>
                  )
              )}
            </Row>
          ) : null}
          {data.retweeted_status ? (
            <Retweeted data={data.retweeted_status} />
          ) : null}
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
