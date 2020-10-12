const Cab = require("../models/cab");
const Rides = require("../models/rides")
const responseHandler = require('../utilities/responseHandler')
const {
    RADIUS
} = require("../constant")
const helper = require("../utilities/helper")
let hlpr = new helper()

exports.onBoardCab = (body) => {
    return new Promise((resolve, reject) => {
        let lat = parseFloat(body.loc.split(",")[0])
        let long = parseFloat(body.loc.split(",")[1])

        const cab = new Cab({
            userId: body.userId,
            cabNumber: body.cabNumber,
            isActive: body.isActive,
            isAvailable: body.isAvailable,
            isPink: body.isPink,
            loc: {
                type: "Point",
                coordinates: [long, lat]
            }
        });
        cab.save((err, cab) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                resolve(responseHandler.success({
                    message: "Cab has been onboarded successfully!",
                    cabId: cab._id
                }));
            }
        });
    })
}

exports.fetchCabs = (body) => {
    return new Promise((resolve, reject) => {
        let lat = parseFloat(body.lat)
        let long = parseFloat(body.long)
        let query = {
            loc: {
                $near: {
                    $maxDistance: RADIUS,
                    $geometry: {
                        type: "Point",
                        coordinates: [long, lat]
                    }
                }
            },
            isActive: 1,
            isAvailable: 1
        }
        if (body.isPink) {
            query.isPink = body.isPink
        }
        Cab.find(query).find((err, cabsInfo) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                resolve(responseHandler.success({
                    cabsInfo
                }));
            }
        });
    })
}

exports.allocateCab = (body) => {
    return new Promise((resolve, reject) => {
        const source_lat = parseFloat(body.source.split(",")[0])
        const source_long = parseFloat(body.source.split(",")[1])
        const dest_lat = parseFloat(body.destination.split(",")[0])
        const dest_long = parseFloat(body.destination.split(",")[1])

        const ride = new Rides({
            userId: body.userId,
            cabId: body.cabId,
            source: {
                type: "Point",
                coordinates: [source_long, source_lat]
            },
            destination: {
                type: "Point",
                coordinates: [dest_long, dest_lat]
            },
            isComplete: 0,
            startTime: hlpr.getIsoDate().dt,
            isPinkRide: body.isPink ? body.isPink : 0
        });
        ride.save((err, ride) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                Cab.updateOne({
                    _id: body.cabId
                }, {
                    isAvailable: 0
                }, (err, result) => {
                    if (err) {
                        reject(responseHandler.errorHandler({
                            message: err["message"],
                        }));
                    } else {
                        resolve(responseHandler.success({
                            message: "Your ride has been booked successfully!",
                            ride
                        }));
                    }
                })
            }
        });
    })
}

exports.deportCab = (body) => {
    return new Promise((resolve, reject) => {
        let update_query = {
            isComplete: 1,
            endTime: hlpr.getIsoDate().dt
        }

        if (body.destination) {
            const lat = parseFloat(body.destination.split(",")[0])
            const long = parseFloat(body.destination.split(",")[1])
            update_query.destination = {
                type: "Point",
                coordinates: [long, lat]
            }
        }

        Rides.findOne({
            _id: body.rideId
        }, (err, ride) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                if (ride) {
                    if (!update_query.destination) {
                        update_query.distance = hlpr.getDistance(ride.source.coordinates[1], ride.source.coordinates[0], ride.destination.coordinates[1], ride.destination.coordinates[0])
                    } else {
                        update_query.distance = hlpr.getDistance(ride.source.coordinates[1], ride.source.coordinates[0], update_query.destination.coordinates[1], update_query.destination.coordinates[0])
                    }
                    update_query.duration = hlpr.getDuration(ride.startTime, update_query.endTime);
                    update_query.charges = hlpr.getRideCharges(update_query.distance, update_query.duration, ride.isPinkRide)
                    Rides.updateOne({
                        _id: ride._id
                    }, update_query, (err, results) => {
                        if (err) {
                            reject(responseHandler.errorHandler({
                                message: err["message"],
                            }));
                        } else {
                            Cab.updateOne({
                                _id: ride.cabId
                            }, {
                                isAvailable: 1,
                                loc: ride.destination
                            }, (err, result) => {
                                if (err) {
                                    reject(responseHandler.errorHandler({
                                        message: err["message"],
                                    }));
                                } else {
                                    resolve(responseHandler.success({
                                        message: "Your ride has been complete successfully!",
                                        charges: update_query.charges,
                                        duration: update_query.duration,
                                        distance: update_query.distance
                                    }));
                                }
                            })

                        }
                    });
                } else {
                    resolve(responseHandler.errorHandler({
                        message: "No Ride Exists with this ID!"
                    }));
                }
            }
        })
    })
}