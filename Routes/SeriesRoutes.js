const express = require("express");
const seriesController = require("../Controllers/SeriesController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.route("/")
    .get(seriesController.getAllSeries)
    .post(seriesController.createSeries);

router.route("/:id")
    .get(seriesController.getSeries)
    .put(seriesController.updateSeries)
    .delete(seriesController.deleteSeries);

module.exports = router;