const express = require("express");
const cookieParser = require('cookie-parser');
const loginRoutes = require("./routes/loginRoutes");
const routeRoutes = require("./routes/routeRoutes");
const konsultasiRoutes = require("./routes/konsultasiRoutes");
const panduanRoutes = require("./routes/panduanRoutes");
const blogRoutes = require("./routes/blogRoutes");
const lupaRoutes = require("./routes/lupaRoutes");
const aturanRoutes = require("./routes/aturanRoutes");
const beritaRoutes = require("./routes/beritaRoutes");
const path = require("path");

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("masuk");
});
app.use("/", loginRoutes);
app.use("/", routeRoutes);
app.use("/", konsultasiRoutes);
app.use("/", panduanRoutes);
app.use("/", blogRoutes);
app.use("/", lupaRoutes);
app.use("/", aturanRoutes);
app.use("/", beritaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
