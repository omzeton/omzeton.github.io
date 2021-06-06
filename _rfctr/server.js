const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("build"));
app.get("/", (req, res) => {
    res.redirect(301, "/index.html");
});
app.get("/blog", (req, res) => {
    res.redirect(301, "/secret.html");
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
