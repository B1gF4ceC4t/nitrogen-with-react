import React, { Component } from "react";
import { Row, Col } from "antd";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

class Retweeted extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { data } = this.props;
    return (
      <div className="retweeted">
        <a id={data.user.id}>{`@${data.user.screen_name}：`}</a>
        <span
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
      </div>
    );
  }
}

export default Retweeted;
