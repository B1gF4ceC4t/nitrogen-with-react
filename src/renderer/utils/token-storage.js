import { logger } from "./logger";

export const saveToken = token => {
  const sessionStorage = window.sessionStorage;
  try {
    sessionStorage.setItem("token", JSON.stringify(token));
    logger("sessionStorage-save-token", "token save in sessionStorage succeed");
  } catch (error) {
    logger("sessionStorage-save-token", error);
  }
};

export const clearToken = () => {
  const sessionStorage = window.sessionStorage;
  try {
    if (sessionStorage.getItem("token") != null) {
      sessionStorage.removeItem("token");
      logger("sessionStorage-clear-token", "token clear");
    }
  } catch (error) {
    logger("sessionStorage-clear-token", error);
  }
};

export const getToken = () => {
  const sessionStorage = window.sessionStorage;
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    return JSON.parse(token);
  } catch (error) {
    logger("sessionStorage-get-token", error);
    return null;
  }
};
