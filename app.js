const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactRouter);

//handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

//đinh nghĩa xử lý lỗi middleware sau khi app.use() và routes calls
app.use((err, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal server Error",
  });
});

module.exports = app;
