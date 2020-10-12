module.exports = {
    "ENV": process.env.NODE_ENV || "development",
    "PORT": process.env.PORT || 4488,
    "SECRET_KEY": "my_secret_key",
    "ROLES": ["user", "driver"],
    "RADIUS": 3000 // it is in meters
}