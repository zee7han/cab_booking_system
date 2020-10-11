class Helper {
    constructor() {
    }

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    getIsoDate() {
        let dt = new Date();
        let tdy_dt = dt.toLocaleDateString();
        dt = dt.toISOString()
        return {
            dt,
            tdy_dt
        }
    }
}

module.exports = Helper