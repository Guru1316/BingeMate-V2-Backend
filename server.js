const app = require("./index.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
    path: "./config.env"
});

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Connected Successfully");
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});