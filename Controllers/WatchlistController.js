const Watchlist = require("../Models/WatchlistModel");
const Series = require("../Models/SeriesModel");

exports.getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.find({ user: req.user.id })
            .populate("series")
            .sort({ addedAt: -1 });
        
        const seriesList = watchlist.map(item => item.series);
        
        res.status(200).json({
            status: "Success",
            data: seriesList
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.addToWatchlist = async (req, res) => {
    try {
        const { seriesId } = req.body;

        const series = await Series.findById(seriesId);

        if (!series) {
            return res.status(404).json({
                status: "Failed",
                message: "Series not found"
            });
        }

        const existingItem = await Watchlist.findOne({
            user: req.user.id,
            series: seriesId
        });

        if (existingItem) {
            return res.status(400).json({
                status: "Failed",
                message: "Already in watchlist"
            });
        }

        const watchlistItem = await Watchlist.create({
            user: req.user.id,
            series: seriesId
        });

        res.status(201).json({
            status: "Success",
            data: watchlistItem
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {
        const watchlistItem = await Watchlist.findOne({
            user: req.user.id,
            series: req.params.seriesId
        });

        if (!watchlistItem) {
            return res.status(404).json({
                status: "Failed",
                message: "Item not found in watchlist"
            });
        }

        await Watchlist.findOneAndDelete({
            user: req.user.id,
            series: req.params.seriesId
        });

        res.status(204).json({
            status: "Success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.clearWatchlist = async (req, res) => {
    try {
        await Watchlist.deleteMany({ user: req.user.id });
        
        res.status(204).json({
            status: "Success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};