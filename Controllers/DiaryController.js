const Diary = require("../Models/DiaryModel");
const Series = require("../Models/SeriesModel");

exports.getPublicDiaryEntries = async (req, res) => {
    try {
        const diaryEntries = await Diary.find()
        .populate("series", "name poster_path first_air_date")
        .populate("user", "email")
        .sort({ createdAt: -1 });

        const validEntries = diaryEntries.filter(entry => entry.series);

        res.status(200).json({
        status: "Success",
        data: validEntries
        });

    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
};

exports.getAllDiaryEntries = async (req, res) => {
    try {
        const diaryEntries = await Diary.find({ user: req.user.id })
            .populate("series", "name poster_path first_air_date")
            .sort({ watchedOn: -1 });
        
        res.status(200).json({
            status: "Success",
            data: diaryEntries
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.getDiaryEntriesBySeries = async (req, res) => {
    try {
        const { seriesId } = req.params;

        const diaryEntries = await Diary.find({ series: seriesId })
            .populate("series", "name poster_path first_air_date")
            .populate("user", "email")
            .sort({ createdAt: -1 });

        const validEntries = diaryEntries.filter(entry => entry.series);

        res.status(200).json({
            status: "Success",
            data: validEntries
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
};

exports.getDiaryEntry = async (req, res) => {
    try {
        const diaryEntry = await Diary.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate("series", "name poster_path first_air_date");

        if (!diaryEntry) {
            return res.status(404).json({
                status: "Failed",
                message: "Diary entry not found"
            });
        }

        res.status(200).json({
            status: "Success",
            data: diaryEntry
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.createDiaryEntry = async (req, res) => {
    try {
        const { seriesId, rating, review, watchedOn } = req.body;

        const series = await Series.findOne({
            _id: seriesId,
            user: req.user.id
        });

        if (!series) {
            return res.status(404).json({
                status: "Failed",
                message: "Series not found"
            });
        }

        const diaryEntry = await Diary.create({
            user: req.user.id,
            series: seriesId,
            rating,
            review,
            watchedOn
        });

        const populatedEntry = await Diary.findById(diaryEntry._id)
            .populate("series", "name poster_path first_air_date");

        res.status(201).json({
            status: "Success",
            data: populatedEntry
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.updateDiaryEntry = async (req, res) => {
    try {
        const diaryEntry = await Diary.findById(req.params.id);

        if (!diaryEntry) {
            return res.status(404).json({
                status: "Failed",
                message: "Diary entry not found"
            });
        }

        if (diaryEntry.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Failed",
                message: "Not authorized"
            });
        }

        const updatedEntry = await Diary.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("series", "name poster_path first_air_date");

        res.status(200).json({
            status: "Success",
            data: updatedEntry
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
};

exports.deleteDiaryEntry = async (req, res) => {
    try {
        const diaryEntry = await Diary.findById(req.params.id);

        if (!diaryEntry) {
            return res.status(404).json({
                status: "Failed",
                message: "Diary entry not found"
            });
        }

        if (diaryEntry.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: "Failed",
                message: "Not authorized"
            });
        }

        await Diary.findByIdAndDelete(req.params.id);

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

exports.clearDiary = async (req, res) => {
    try {
        await Diary.deleteMany({ user: req.user.id });
        
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