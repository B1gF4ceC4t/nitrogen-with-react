export const logger = (tag, message) => {
  if (typeof message == "object") {
    console.log(`${tag}:`,message);
  } else {
    console.log(`${tag}:${message}`);
  }
};
