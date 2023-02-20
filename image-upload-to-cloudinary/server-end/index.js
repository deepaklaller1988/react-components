const express = require("express");
const cors = require("cors");
const apiRoute = require("./routes/routes");
require("./config");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
    }));
app.use(cors())

app.use("/api", apiRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
