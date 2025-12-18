const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    tmdbId: {
        type: Number,
        required: [true, "TMDB ID is required"]
    },
    name: {
        type: String,
        required: [true, "Series name is required"],
        trim: true
    },
    poster_path: {
        type: String,
        required: [true, "Poster path is required"],
        trim: true
    },
    backdrop_path: {
        type: String,
        required: [true, "Backdrop path is required"],
        trim: true
    },
    vote_average: {
        type: Number,
        required: [true, "Vote average is required"]
    },
    vote_count: {
        type: Number,
        required: [true, "Vote count is required"]
    },
    popularity: {
        type: Number,
        required: [true, "Popularity is required"]
    },
    first_air_date: {
        type: String,
        required: [true, "First air date is required"],
        trim: true
    },
    original_language: {
        type: String,
        required: [true, "Original language is required"],
        trim: true
    },
    original_name: {
        type: String,
        required: [true, "Original name is required"],
        trim: true
    },
    origin_country: [{
        type: String,
        trim: true
    }],
    genres: [{
        type: String,
        trim: true
    }],
    overview: {
        type: String,
        required: [true, "Overview is required"],
        trim: true
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;