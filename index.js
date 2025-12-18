const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));

app.use(express.json());

const authRouter = require("./Routes/AuthRoutes");
const seriesRouter = require("./Routes/SeriesRoutes");
const diaryRouter = require("./Routes/DiaryRoutes");
const watchlistRouter = require("./Routes/WatchlistRoutes");
const userRouter = require("./Routes/UserRoutes");
const adminRouter = require("./Routes/AdminRoutes");

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/series", seriesRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/users", userRouter);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Binge Mate API is running"
    });
});

const { errorHandler } = require("./Middleware/errorMiddleware");
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

module.exports = app;