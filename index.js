const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://guru1316.github.io"],
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

module.exports = app;