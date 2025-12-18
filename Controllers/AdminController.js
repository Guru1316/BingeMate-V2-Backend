const User = require("../Models/UserModel");
const Series = require("../Models/SeriesModel");
const Diary = require("../Models/DiaryModel");
const Watchlist = require("../Models/WatchlistModel");

exports.getAdminStats = async (req, res) => {
    try {
        const [usersCount, seriesCount, reviewsCount, watchlistCount] = await Promise.all([
            User.countDocuments(),
            Series.countDocuments(),
            Diary.countDocuments(),
            Watchlist.countDocuments()
        ]);

        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("username email createdAt");

        const recentReviews = await Diary.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "email username")
            .populate("series", "name poster_path");

        res.status(200).json({
            status: "Success",
            data: {
                counts: {
                    users: usersCount,
                    series: seriesCount,
                    reviews: reviewsCount,
                    watchlist: watchlistCount
                },
                recentUsers,
                recentReviews
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
};