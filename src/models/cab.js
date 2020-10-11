const mongoose = require("mongoose");

const Cab = mongoose.model(
  "Cab",
  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cabNumber: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    isPink: {
        type: Boolean,
        required: true
    },
    loc: {
        "type": "Point",
        "coordinates": [],
        required: true
    }
  })
);

module.exports = Cab;