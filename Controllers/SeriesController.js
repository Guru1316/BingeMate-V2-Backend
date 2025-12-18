const Series = require("../Models/SeriesModel");

exports.getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().sort({ createdAt: -1 })

    res.status(200).json({
      status: "Success",
      data: series
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message
    })
  }
}

exports.getSeries = async (req, res) => {
    try {
        const series = await Series.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!series) {
            return res.status(404).json({
                status: "Failed",
                message: "Series not found"
            });
        }

        res.status(200).json({
            status: "Success",
            data: series
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.createSeries = async (req, res) => {
    try {
        const {
            tmdbId,
            name,
            poster_path,
            backdrop_path,
            vote_average,
            vote_count,
            popularity,
            first_air_date,
            original_language,
            original_name,
            origin_country,
            genres,
            overview
        } = req.body;

        const existingSeries = await Series.findOne({
            user: req.user.id,
            tmdbId: tmdbId || Date.now()
        });

        if (existingSeries) {
            return res.status(400).json({
                status: "Failed",
                message: "Series already exists in your collection"
            });
        }

        const series = await Series.create({
            user: req.user.id,
            tmdbId: tmdbId || Date.now(),
            name,
            poster_path,
            backdrop_path,
            vote_average,
            vote_count,
            popularity,
            first_air_date,
            original_language,
            original_name,
            origin_country: Array.isArray(origin_country) ? origin_country : [origin_country],
            genres: Array.isArray(genres) ? genres : [genres],
            overview,
            isCustom: !tmdbId
        });

        res.status(201).json({
            status: "Success",
            data: series
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.updateSeries = async (req, res) => {
    try {
        const series = await Series.findById(req.params.id);

        if (!series) {
            return res.status(404).json({
                status: "Failed",
                message: "Series not found"
            });
        }

        if (series.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Failed",
                message: "Not authorized"
            });
        }

        const updatedSeries = await Series.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status: "Success",
            data: updatedSeries
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.deleteSeries = async (req, res) => {
    try {
        const series = await Series.findById(req.params.id);

        if (!series) {
            return res.status(404).json({
                status: "Failed",
                message: "Series not found"
            });
        }

        if (series.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Failed",
                message: "Not authorized"
            });
        }

        await Series.findByIdAndDelete(req.params.id);

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