import React, { Component } from "react";
import { Row, Col } from "antd";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

class Pics extends Component {
  constructor(props) {
    super(props);
  }
  loadImage = url => () => {
    document
      .querySelector(`.${StringUtils.formatImgClassname(url)}`)
      .setAttribute("src", StringUtils.formatImgMiddle(url));
  };
  render() {
    let { pic_urls } = this.props;
    return (
      <Row className="pics" gutter={16}>
        {pic_urls.map((item, index, array) => {
          let length = array.length;
          if (length === 1) {
            return (
              <Col span={16} key={index} className="pics-col">
                <img
                  src={item.thumbnail_pic}
                  className={StringUtils.formatImgClassname(item.thumbnail_pic)}
                  onLoad={this.loadImage(item.thumbnail_pic)}
                />
              </Col>
            );
          } else if (length === 4) {
            return (
              <Col span={12} key={index} className="pics-col">
                <img
                  src={item.thumbnail_pic}
                  className={StringUtils.formatImgClassname(item.thumbnail_pic)}
                  onLoad={this.loadImage(item.thumbnail_pic)}
                />
              </Col>
            );
          } else {
            return (
              <Col span={8} key={index} className="pics-col">
                <img
                  src={item.thumbnail_pic}
                  className={StringUtils.formatImgClassname(item.thumbnail_pic)}
                  onLoad={this.loadImage(item.thumbnail_pic)}
                />
              </Col>
            );
          }
        })}
      </Row>
    );
  }
}

export default Pics;
