const Joi = require('joi');

module.exports = {
    // POST /v1/auth/signup
    signup: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.string().optional()
        },
        query: {},
        param: {},
    },

    // POST /v1/auth/signin
    signin: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
        param: {},
        query: {}
    }
};