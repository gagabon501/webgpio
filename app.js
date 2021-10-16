const express = require("express");
const logger = require("morgan");
const path = require("path");
const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
