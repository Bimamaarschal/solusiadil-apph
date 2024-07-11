const express = require("express");
const cookieParser = require('cookie-parser');
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const routeRoutes = require("./routes/routeRoutes");
const konsultasiRoutes = require("./routes/konsultasiRoutes");
const path = require("path");

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", registerRoutes);
app.use("/", loginRoutes);
app.use("/", routeRoutes);
app.use("/", konsultasiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
