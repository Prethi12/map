const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true,
  },
  Lang: {
    type: Number,
    required: true,
  },
  Lat: {
    type: Number,
    required: true,
  },
});

const Marker = mongoose.model("Marker", MarkerSchema);
module.exports = Marker;
