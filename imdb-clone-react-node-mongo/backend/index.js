const express = require("express");
const cors = require("cors");
// const Movie = require("./models/movieModel");
const apiRoute = require("./routes/routes");
const cookieParser = require("cookie-parser");
require("./config");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


// app.use("/post", async (req, res) => {
//   let user = new Movie(req.body);
//   let result = await user.save();
//   res.send(result);
// });

app.use("/api", apiRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
