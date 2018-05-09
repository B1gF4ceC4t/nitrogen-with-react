import React, { Component } from "react";
import classnames from "classnames";
import * as StringUtils from "../../utils/string-utils";
import "./index.less";

class CommentSource extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { status, comment } = this.props;
    return (
      <div className="comment-source">
        {comment === null ? null : (
          <div
            className="comment-reply"
            dangerouslySetInnerHTML={{
              __html: StringUtils.formatContent(
                `@${comment.user.name}${comment.text}`
              )
            }}
          />
        )}
        {status.deleted === "1" ? (
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: StringUtils.formatContent(status.text)
            }}
          />
        ) : (
          <div className={classnames("source", { white: comment !== null })}>
            <div className="source-avatar">
              <img src={status.user.avatar_large} />
            </div>
            <div className="source-info">
              <a id={status.user.id}>{`@${status.user.screen_name}：`}</a>
              <span
                className="text"
                dangerouslySetInnerHTML={{
                  __html: StringUtils.formatContent(status.text)
                }}
              />
            </div>

            <div />
          </div>
        )}
      </div>
    );
  }
}

export default CommentSource;
