import React, { Component } from "react";
import { Carousel, Icon } from "antd";
import mirror, { actions, connect } from "mirrorx";
import { remote } from "electron";
import classnames from "classnames";
import ViewModel from "../../models/View";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

mirror.model(ViewModel);
const win = remote.getGlobal("win");
let [width, height] = win.getContentSize();

class PicView extends Component {
  constructor(props) {
    super(props);
  }
  hiddenView = () => {
    actions.view.save({
      showView: false
    });
  };
  componentDidUpdate() {
    this.carousel.slick.slickGoTo(this.props.selectedIndex);
  }
  componentDidMount() {
    win.on("resize", () => {
      [width, height] = win.getContentSize();
      if (this.view) {
        console.log(this.view.style.height);
        this.view.style.height = `${height - 90}px`;
      }
    });
  }
  render() {
    let { showView, viewUrls } = this.props;
    return (
      <div className={classnames("pic-view", { show: showView })}>
        <Icon type="close" onClick={this.hiddenView} />
        <Carousel effect="fade" ref={el => (this.carousel = el)}>
          {viewUrls.map((item, index) => (
            <div
              key={index}
              className="pic-view-item"
              style={{ height: height - 90 }}
              ref={el => (this.view = el)}
            >
              <img src={StringUtils.formatImgLarge(item.thumbnail_pic)} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default connect(state => state.view)(PicView);
