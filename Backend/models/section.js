const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subSection",
        required: true,
    },]
});

module.exports = mongoose.model("section", sectionSchema);