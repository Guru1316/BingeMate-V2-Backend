const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series",
        required: [true, "Series ID is required"]
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

watchlistSchema.index({ user: 1, series: 1 }, { unique: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
module.exports = Watchlist;