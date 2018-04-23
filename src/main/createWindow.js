import { BrowserWindow, app } from "electron";
import { format } from "url";
import { resolve } from "path";

const createWindow = () => {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 930,
    minWidth: 930,
    height: 630,
    minHeight: 630,
    center: true,
    resizable: true,
    alwaysOnTop: false,
    frame: true,
    skipTaskbar: false,
    title: "Nitrogen"
  });
  if (__isDev__) {
    win.loadURL("http://localhost:8080/index.html");
    BrowserWindow.addDevToolsExtension(
      "/Users/liufei/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.1_0"
    );
    BrowserWindow.addDevToolsExtension(
      "/Users/liufei/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.2_0"
    );
    // Open the DevTools.
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      format({
        pathname: resolve(process.resourcesPath, "app/renderer/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
  });
  global.win = win;
  return win;
};

export default createWindow;
