const User = require("../models/user")
const jwt = require("jsonwebtoken");
const {
    SECRET_KEY
} = require("../constant")

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
            return;
        } else {
            if (user) {
                res.status(400).send({
                    message: "Failed! Username is already in use!"
                });
                return;
            } else {
                User.findOne({
                    email: req.body.email
                }).exec((err, user) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    } else {
                        if (user) {
                            res.status(400).send({
                                message: "Failed! Email is already in use!"
                            });
                            return;
                        } else {
                            next();
                        }
                    }
                });
            }
        }
    });
};

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    } else {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        });
    }
};