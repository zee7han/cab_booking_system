const Joi = require('joi');

module.exports = {
    // POST /v1/cabs/onboard_cab
    onBoardCab: {
        body: {
            userId: Joi.string().optional(),
            cabNumber: Joi.string().required(),
            isActive: Joi.number().required(),
            isAvailable: Joi.number().required(),
            isPink: Joi.number().required(),
            loc: Joi.string().required()
        },
        query: {},
        param: {},
    },

    // GET /v1/cabs/fetch_cabs
    fetchCabs: {
        body: {},
        query: {
            lat: Joi.string().required(),
            long: Joi.string().required(),
            isPink: Joi.number().optional()
        },
        param: {},
    },

    // POST /v1/cabs/allocate_cab
    allocateCab: {
        body: {
            userId: Joi.string().optional(),
            cabId: Joi.string().required(),
            source: Joi.string().required(),
            destination: Joi.string().required(),
        },
        query: {},
        param: {},
    },

    // POST /v1/cabs/deport_cab
    deportCab: {
        body: {
            rideId: Joi.string().required()
        },
        query: {},
        param: {},
    },
};