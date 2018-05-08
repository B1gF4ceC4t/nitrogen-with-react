import React, { Component } from "react";
import { Row, Col } from "antd";
import Pics from "../Pics";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

class Retweeted extends Component {
  constructor(props) {
    super(props);
  }
  loadImage = url => () => {
    document
      .querySelector(`.${StringUtils.formatImgClassname(url)}`)
      .setAttribute("src", StringUtils.formatImgMiddle(url));
  };
  render() {
    let { data } = this.props;
    return (
      <div className="retweeted">
        {data.deleted === "1" ? (
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: StringUtils.formatContent(data.text)
            }}
          />
        ) : (
          <div>
            <a id={data.user.id}>{`@${data.user.screen_name}：`}</a>
            <span
              className="text"
              dangerouslySetInnerHTML={{
                __html: StringUtils.formatContent(data.text)
              }}
            />
            {data.pic_urls ? <Pics pic_urls={data.pic_urls} /> : null}
          </div>
        )}
      </div>
    );
  }
}

export default Retweeted;
