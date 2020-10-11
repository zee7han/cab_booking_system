const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
    SECRET_KEY
} = require("../constant");
const User = require("../models/user");
const Role = require("../models/role");
const responseHandler = require('../utilities/responseHandler')


exports.registerUser = (body) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            username: body.username,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8)
        });

        user.save((err, user) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                if (body.role) {
                    Role.find({
                        name: {
                            $in: body.role
                        }
                    }, (err, role) => {
                        if (err) {
                            reject(responseHandler.errorHandler({
                                message: err["message"],
                            }));
                        } else {
                            user.role = role._id
                            user.save(err => {
                                if (err) {
                                    reject(responseHandler.errorHandler({
                                        message: err["message"],
                                    }));
                                } else {
                                    resolve(responseHandler.success({
                                        message: "User has been registered successfully!",
                                    }));
                                }
                            });
                        }

                    });
                } else {
                    Role.findOne({
                        name: "user"
                    }, (err, role) => {
                        if (err) {
                            reject(responseHandler.errorHandler({
                                message: err["message"],
                            }));
                        } else {
                            user.roles = role._id;
                            user.save(err => {
                                if (err) {
                                    reject(responseHandler.errorHandler({
                                        message: err["message"],
                                    }));
                                } else {
                                    resolve(responseHandler.success({
                                        message: "User has been registered successfully!",
                                    }));
                                }
                            });
                        }
                    });
                }
            }
        });

    })
}

exports.loginUser = (body) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: body.username
        }).populate("role", "-__v").exec((err, user) => {
            if (err) {
                reject(responseHandler.errorHandler({
                    message: err["message"],
                }));
            } else {
                if (!user) {
                    reject(responseHandler.invalid({
                        message: "User Not found.",
                    }));
                } else {
                    let passwordIsValid = bcrypt.compareSync(body.password, user.password);
                    if (!passwordIsValid) {
                        return responseHandler.invalid({
                            message: "Invalid Password.",
                            accessToken: null
                        })
                    } else {
                        const token = jwt.sign({
                            id: user.id
                        }, SECRET_KEY, {
                            expiresIn: 86400 // 24 hours
                        });
                        resolve(responseHandler.success({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            accessToken: token
                        }));
                    }
                }
            }
        });
    })
}