const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDb = require("./config/mongoDbCon");
const UserRoute = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
    },
  })
);

app.use("/", UserRoute);

const PORT = 5000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
