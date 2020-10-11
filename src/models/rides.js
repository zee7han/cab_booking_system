const mongoose = require("mongoose");

const Rides = mongoose.model(
    "Rides",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cabId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cab",
            required: true
        },
        isComplete: {
            type: Number,
            required: true
        },
        distance: {
            type: Number
        },
        duration: {
            type: Number
        },
        charges: {
            type: Number
        },
        isPinkRide: {
            type: Number
        },
        source: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        destination: {
            type: {
                type: String
            },
            coordinates: [Number]
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