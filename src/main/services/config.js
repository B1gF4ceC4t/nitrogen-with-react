const key_config = {
  app_key: '3768700692',
  app_secret: '1e8762f8ed9f4c090143ba6af33cfa4d',
  redirect_uri: 'http://127.0.0.1:8080/login'
}

const host_config = {
  local: 'http://127.0.0.1:8080/index.html',
  host: 'https://api.weibo.com',
  oauth: 'https://api.weibo.com/oauth2/authorize',
}

const api_router_config = {
  accessToken: '/oauth2/access_token',
  getUserInfo: '/2/users/show.json',
  getHomeTimeLine: '/2/statuses/home_timeline.json',
}

export const HOST_CONCIG = host_config
export const KEY_CONFIG = key_config
export const API_ROUTER_CONFIG = api_router_config