const mongoose = require("mongoose");

const Rides = mongoose.model(
  "Rides",
  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    },
    source: {
        "type": "Point",
        "coordinates": [],
        required: true
    },
    destination: {
        "type": "Point",
        "coordinates": [],
        required: true
    },
    startTime: {
        "type": Date
    },
    endTime: {
        "type": Date
    }
  })
);

module.exports = Rides;