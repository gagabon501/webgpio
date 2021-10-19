const express = require("express");
const accessLogger = require("morgan");
const appLogger = require("./controllers/logger"); //using winston
const path = require("path");
const rfs = require("rotating-file-stream"); // version 2.x
const error = require("./middleware/error");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
// app.use(logger("combined"));

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

// setup the logger - access logger 'morgan'
app.use(accessLogger("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Session Manager
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: true,
    secret: "amon garahe",
    saveUninitialized: true,
  })
);

// Connect flash
app.use(flash());

// Global variables
// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

// Routes
app.use("/", require("./routes/index.js"));

//error handler middleware - should be the last to be called among all middlewares
app.use(error);

// app.use(function (err, req, res, next) {
//   console.log(err);
//   appLogger.error(`Server error: ${err.message}`);
//   next;
//   //   console.log("Error: ", err.message)
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, appLogger.info(`Server running on  ${PORT}`));
