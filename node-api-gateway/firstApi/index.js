//setting firest server
const app = require("express")();

app.get("/first", (req, res) => res.send("Hello from first API"));

app.listen(3001, () => console.log("First API listening on Port 3001"));
