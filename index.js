const serverless = require("serverless-http");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

// mongoose
mongoose
  .connect(
    "mongodb+srv://admin:7wK0VuTb0Qz0TPaZ@mams.pjugncd.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .set("strictQuery", true)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// set up middleware
app.use(
  express.json({
    limit: "500mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// set up routes
// send public folder as static
app.use("/public", express.static("./public"));
// test route
app.use("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

fs.readdirSync("./routes").map((file) => {
  app.use("/api", require(`./routes/${file}`));
});

const PORT = process.env.PORT || 5036;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
