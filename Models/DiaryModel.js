const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Minimum rating is 1"],
        max: [5, "Maximum rating is 5"]
    },
    review: {
        type: String,
        required: [true, "Review is required"],
        trim: true
    },
    watchedOn: {
        type: Date,
        required: [true, "Watched date is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;