const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    departure: {type: String, required: true},
    arrival: {type: String, required: true}
});

module.exports = mongoose.model("Journey",journeySchema);