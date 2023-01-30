const express = require("express");
const httpProxy = require("express-http-proxy");

const app = express();
const port = 3000;

const { FIRST_API, SECOND_API } = require("./urls");

const firstServiceProxy = httpProxy(FIRST_API);
const secondServiceProxy = httpProxy(SECOND_API);

//setting up api gateway

app.get("/", (req, res) => res.send("Hello API GATEWAY!!!"));

app.get("/first", (req, res, next) => firstServiceProxy(req, res, next));
app.get("/second", (req, res, next) => secondServiceProxy(req, res, next));

app.listen(port, () => console.log(`API GateWay listening on port ${port}`));
