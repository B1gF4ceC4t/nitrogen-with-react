import axios from "axios";
import queryString from "queryString";
import { HOST_CONCIG, KEY_CONFIG, API_ROUTER_CONFIG } from "./config";

/**
 * @description 获取授权过的Access Token
 */
export const accessToken = code => {
  var oauthData = {
    client_id: KEY_CONFIG.app_key,
    client_secret: KEY_CONFIG.app_secret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: KEY_CONFIG.redirect_uri
  };

  return axios({
    method: "post",
    data: queryString.stringify(oauthData),
    url: API_ROUTER_CONFIG.access_token,
    baseURL: HOST_CONCIG.host
  });
};
