const express = require("express");
const cors = require("cors");
const route = require("./routes/route");
require("dotenv").config();
require("./db/connection");

const PORT = process.env.PORT || 8003;
const app = express();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));

app.use(cors());

app.listen(PORT, () => {
  console.log(
    `${
      process.env.APP_NAME || "App Name"
    } listening at http://localhost:${PORT}`
  );
});
route(app);
