const newman = require('newman');

newman.run({
    collection: require(`./cab_booking_system.postman_collection.json`),
    environment: require(`./cab_booking_system.postman_environment.json`),
    iterationCount: 1,
    reporters: 'cli'
}, function (err,result) {
    if (err) { throw err; }
    return result["run"]["stats"]
});
