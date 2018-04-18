import React, { Component } from "react";
import { Row, Col, Tooltip } from "antd";
import LazyLoad from "react-lazy-load";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

const ZoomImage = ({ url }) => (
  <img src={url} style={{ width: "100%", height: "100%" }} />
);

class Pics extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { pic_urls } = this.props;
    return (
      <Row className="pics" gutter={16}>
        {pic_urls.map((item, index, array) => {
          let length = array.length;
          if (length === 1) {
            return (
              <Tooltip
                key={index}
                title={() => (
                  <ZoomImage
                    url={StringUtils.formatImgLarge(item.thumbnail_pic)}
                  />
                )}
                placement="rightTop"
                overlayClassName="zoom-image"
              >
                <Col span={16} className="pics-col">
                  <LazyLoad>
                    <img
                      src={StringUtils.formatImgMiddle(item.thumbnail_pic)}
                    />
                  </LazyLoad>
                </Col>
              </Tooltip>
            );
          } else if (length === 4) {
            return (
              <Tooltip
                key={index}
                title={() => (
                  <ZoomImage
                    url={StringUtils.formatImgLarge(item.thumbnail_pic)}
                  />
                )}
                placement="rightTop"
                overlayClassName="zoom-image"
              >
                <Col span={12} className="pics-col">
                  <LazyLoad>
                    <img
                      src={StringUtils.formatImgMiddle(item.thumbnail_pic)}
                    />
                  </LazyLoad>
                </Col>
              </Tooltip>
            );
          } else {
            return (
              <Tooltip
                key={index}
                title={() => (
                  <ZoomImage
                    url={StringUtils.formatImgLarge(item.thumbnail_pic)}
                  />
                )}
                placement="rightTop"
                overlayClassName="zoom-image"
              >
                <Col span={8} className="pics-col">
                  <LazyLoad>
                    <img
                      src={StringUtils.formatImgMiddle(item.thumbnail_pic)}
                    />
                  </LazyLoad>
                </Col>
              </Tooltip>
            );
          }
        })}
      </Row>
    );
  }
}

export default Pics;
