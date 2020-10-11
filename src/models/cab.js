const mongoose = require("mongoose");

let cabSchema = new mongoose.Schema({
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
        type: Number,
        required: true
    },
    isAvailable: {
        type: Number,
        required: true
    },
    isPink: {
        type: Number,
        required: true
    },
    loc: {
        type: {
            type: String
        },
        coordinates: [Number]
    }
})

cabSchema.index({
    loc: "2dsphere"
});

const Cab = mongoose.model("Cab", cabSchema);

module.exports = Cab;