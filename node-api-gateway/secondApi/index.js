//setting second server
const app = require("express")();

app.get("/second", (req, res) => res.send("Hello second Api"));

app.listen(3002, () => console.log("Second API listening on port 3002!!!"));
