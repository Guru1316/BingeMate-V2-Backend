const express = require("express");
const watchlistController = require("../Controllers/WatchlistController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
    .get(watchlistController.getWatchlist)
    .post(watchlistController.addToWatchlist)
    .delete(watchlistController.clearWatchlist);

router.delete("/:seriesId", watchlistController.removeFromWatchlist);

module.exports = router;