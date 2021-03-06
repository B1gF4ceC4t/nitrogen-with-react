import {
  app,
  BrowserWindow,
  Menu,
  shell,
  ipcMain,
  globalShortcut
} from "electron";
import createWindow from "./createWindow";
import configureMenu from "./menu";
import ipc from "./ipc";

let win;

/**
 * @description 初始化窗口等相关
 */
const onReady = () => {
  win = createWindow();
  if (!__isDev__) {
    const menu = Menu.buildFromTemplate(configureMenu({ app }));
    Menu.setApplicationMenu(menu);
  }
  // 启动调试工具
  globalShortcut.register("CmdOrCtrl+Shift+8", () => {
    win.webContents.toggleDevTools();
  });
  ipc();
};

//当 Electron 完成初始化时被触发
app.on("ready", onReady);

//当所有的窗口都被关闭时被触发
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//当激活electron窗体的时候，仅支持MacOS
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
  win.show();
});

//全局挂载供渲染进程使用
global.app = app;
