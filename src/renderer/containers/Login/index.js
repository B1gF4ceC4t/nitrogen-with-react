import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { Button } from "antd";
import { getUrlKey } from "../../utils/string-utils";
import { HOST_CONCIG, KEY_CONFIG } from "../../../main/services/config";
import AuthModel from "../../models/Auth";
import { ipcRenderer, remote } from "electron";
import { logger } from "../../utils/logger";
import "./index.less";

mirror.model(AuthModel);
const win = remote.getGlobal("win");
const ipc = ipcRenderer;

ipc.on("weibo::accessToken::success", (event, msg) => {
  if (msg) {
    logger("weibo::accessToken::success", msg);
    actions.auth.saveToken(msg);
    actions.routing.push("/main");
  }
});

ipc.on("weibo::accessToken::fail", (event, msg) => {
  if (msg) {
    logger("weibo::accessToken::fail", msg);
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
  }
  go2Home = () => {
    actions.routing.push("/main");
  };
  go2Auth = () => {
    win.loadURL(
      `${HOST_CONCIG.oauth}?client_id=${KEY_CONFIG.app_key}&redirect_uri=${
        KEY_CONFIG.redirect_uri
      }`
    );
  };
  componentDidMount = () => {
    let oauthCode = getUrlKey("code");
    if (oauthCode) {
      actions.auth.accessToken(oauthCode);
    }
  };
  render() {
    return (
      <div className="login">
        {this.props.login ? (
          <Button className="button enter" onClick={this.go2Home}>
            进入Nitrogen
          </Button>
        ) : (
          <Button className="button login" onClick={this.go2Auth}>
            登录
          </Button>
        )}
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);
