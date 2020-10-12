class Helper {
    constructor() {}

    getIsoDate() {
        let dt = new Date();
        let tdy_dt = dt.toLocaleDateString();
        dt = dt.toISOString()
        return {
            dt,
            tdy_dt
        }
    }

    getDistance(lat1, lon1, lat2, lon2) {
        let p = 0.017453292519943295; // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a));
    }

    // return duration in minutes
    getDuration(startDate, endDate) {
        let duration = Math.ceil((new Date(endDate) - new Date(startDate)) / 60000)
        return duration
    }

    getRideCharges(distance, duration, isPinkRide) {
        let timeCharges = duration * 1;
        let distanceCharges = distance * 2;
        let charges = Math.max(timeCharges, distanceCharges)
        charges = isPinkRide ? charges + 5 : charges
        return charges
    }
}

module.exports = Helper