// import { createLogger, format, transports } from "winston";

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, colorize, errors } = format;

const logConfiguration = {
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.Console({
      level: "warn",
    }),
    new transports.File({
      level: "error",
      filename: "logs/server.log",
      format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
  exitOnError: false,
};

module.exports = createLogger(logConfiguration);
