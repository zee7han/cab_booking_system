const helper = require("../src/utilities/helper")
const hlpr = new helper()

describe("A test suite for the helpers", () => {

    test("A positive scenario for getRideCharges.", () => {
        const result = hlpr.getRideCharges(5, 8, 0)
        expect(result).toBe(10)
    });

    test("A positive scenario for getRideCharges pink ride.", () => {
        const result = hlpr.getRideCharges(5, 8, 1)
        expect(result).toBe(15)
    });

    test("A positive scenario for getDistance.", () => {
        const result = hlpr.getDistance(27.162045,77.986486,27.166007,77.984323)
        expect(result).toBe(0.48977378747107436)
    });

    test("A positive scenario for getDuration.", () => {
        const result = hlpr.getDuration("2020-10-12T06:44:41.277Z","2020-10-12T06:45:05.094Z")
        expect(result).toBe(1)
    });

});