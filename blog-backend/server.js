const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDb = require("./config/mongoDbCon");
const UserRoute = require("./routes/userRoutes");
const BlogRoute = require("./routes/blogRoute");
const CommRoute = require("./routes/commentRoute");
const Upload = require("./config/cloudIntegration");

require("dotenv").config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.14.129:3000",
      "http://blogghub.local:3000",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
      sameSite: "None",
    },
  })
);

app.use("/", UserRoute);
app.use("/", BlogRoute);
app.use("/", CommRoute);

app.use("/", Upload);

const PORT = 5000;
const HOST = "0.0.0.0";
app.listen(PORT, "0.0.0.0", () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
