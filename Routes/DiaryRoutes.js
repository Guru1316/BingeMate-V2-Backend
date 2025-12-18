const express = require("express");
const diaryController = require("../Controllers/DiaryController");
const { protect } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.get("/public", diaryController.getPublicDiaryEntries);
router.get("/series/:seriesId", diaryController.getDiaryEntriesBySeries);

router.use(protect);

router.route("/")
    .get(diaryController.getAllDiaryEntries)
    .post(diaryController.createDiaryEntry)
    .delete(diaryController.clearDiary);

router.route("/:id")
    .get(diaryController.getDiaryEntry)
    .put(diaryController.updateDiaryEntry)
    .delete(diaryController.deleteDiaryEntry);

module.exports = router;