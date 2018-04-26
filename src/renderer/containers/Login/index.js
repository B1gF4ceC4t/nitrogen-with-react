import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { Button, Icon, message } from "antd";
import { getUrlKey } from "../../utils/string-utils";
import { HOST_CONCIG, KEY_CONFIG } from "../../../main/services/config";
import { getToken } from "../../utils/token-storage";
import AuthModel from "../../models/Auth";
import { ipcRenderer as ipc, remote } from "electron";
import { logger } from "../../utils/logger";
import "./index.less";

const win = remote.getGlobal("win");
mirror.model(AuthModel);

ipc.on("weibo::accessToken::success", (event, msg) => {
  if (msg) {
    logger("weibo::accessToken::success", msg);
    if (msg.error_code) {
      message.error(msg.error);
    } else {
      actions.auth.saveToken(msg);
      actions.routing.push("/main");
    }
  }
});

ipc.on("weibo::accessToken::error", (event, msg) => {
  if (msg) {
    logger("weibo::accessToken::error", msg);
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
  checkToken = () => {
    let token = getToken();
    if (token) {
      actions.auth.save({
        token: JSON.parse(token),
        login: true
      });
      return true;
    }
    return false;
  };
  getToken = () => {
    let oauthCode = getUrlKey("code");
    if (oauthCode) {
      actions.auth.accessToken(oauthCode);
    }
  };
  componentWillMount = () => {
    this.checkToken() ? null : this.getToken();
    win.setTitle("Nitrogen");
  };
  render() {
    return (
      <div className="login">
        {this.props.login ? (
          <Button className="button enterBtn" onClick={this.go2Home}>
            进入Nitrogen
            <Icon type="arrow-right" />
          </Button>
        ) : (
          <Button className="button loginBtn" onClick={this.go2Auth}>
            登录
          </Button>
        )}
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);
