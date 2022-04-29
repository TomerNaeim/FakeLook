const { createLogger, transports, format } = require("winston");
const { timestamp, combine, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  // format: combine(timestamp({ format: "YYY-MM-DD HH:mm" }), logFormat),
  level: "debuge",
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log", level: "info" }),
    // new transports.Console({ level: "info" }),
  ],
});
module.exports = logger;
