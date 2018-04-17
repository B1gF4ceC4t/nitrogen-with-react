import { ipcMain } from "electron";
import got from "got";
import { log } from "../util";
import { HOST_CONCIG, API_ROUTER_CONFIG } from "../services/config";

export default () => {
  ipcMain.on(
    "weibo::api",
    (event, { type, method = "GET", data, options = {} }) => {
      (async () => {
        try {
          log(`----------------request[api:${type}]----------------`);
          console.log(data);
          const response = await got(
            HOST_CONCIG["host"] + API_ROUTER_CONFIG[type],
            {
              method,
              [method==="GET"?"query":"body"]: data,
              ...options
            }
          );
          // log(`----------------response[api:${type}]----------------`);
          // console.log(response.body);
          event.sender.send(`weibo::${type}::success`, response.body);
        } catch (error) {
          log(`----------------error[api:${type}]----------------`);
          console.log(error);
          event.sender.send(`weibo::${type}::error`, { err: error, arg: data });
        }
      })();
    }
  );
};
