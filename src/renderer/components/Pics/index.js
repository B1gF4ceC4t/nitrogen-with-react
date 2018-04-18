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
  loadImage = (url, timeStamp) => () => {
    document
      .querySelector(`.${StringUtils.formatImgClassname(url, timeStamp)}`)
      .setAttribute("src", StringUtils.formatImgMiddle(url));
  };
  render() {
    let { pic_urls, timeStamp } = this.props;
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
                      src={item.thumbnail_pic}
                      className={StringUtils.formatImgClassname(
                        item.thumbnail_pic,
                        timeStamp
                      )}
                      onLoad={this.loadImage(item.thumbnail_pic, timeStamp)}
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
                      src={item.thumbnail_pic}
                      className={StringUtils.formatImgClassname(
                        item.thumbnail_pic,
                        timeStamp
                      )}
                      onLoad={this.loadImage(item.thumbnail_pic, timeStamp)}
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
                      src={item.thumbnail_pic}
                      className={StringUtils.formatImgClassname(
                        item.thumbnail_pic,
                        timeStamp
                      )}
                      onLoad={this.loadImage(item.thumbnail_pic, timeStamp)}
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
