import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import { getUrlKey } from "../../utils/string-utils";
import { HOST_CONCIG, KEY_CONFIG } from "../../../main/services/config";
import AuthModel from "../../models/Auth";
import { ipcRenderer } from "electron";
import { logger } from "../../utils/logger";
import "./index.less";

mirror.model(AuthModel);
const ipc = ipcRenderer;

ipc.on("weibo::accessToken::success", (event, msg) => {
  if (msg) {
    logger("weibo::accessToken::success", msg);
    actions.auth.saveToken(msg);
    actions.routing.push("/home");
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
  componentDidMount = () => {
    let oauthCode = getUrlKey("code");
    if (oauthCode) {
      actions.auth.accessToken(oauthCode);
    }
  };
  render() {
    return (
      <div className="login">
        <a
          href={`${HOST_CONCIG.oauth}?client_id=${
            KEY_CONFIG.app_key
          }&redirect_uri=${KEY_CONFIG.redirect_uri}`}
          className="loginBtn"
        >
          登录
        </a>
      </div>
    );
  }
}

export default connect(state => state.auth)(Login);
