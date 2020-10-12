const mongoose = require("mongoose")
const logger = require('../utilities/logger')(__filename)
const Role = require('../models/role')
const {
  ROLES
} = require('../constant')
class MongoDB {
  constructor(conf) {
    this.conf = conf
  }

  initialize() {
    return new Promise((resolve, reject) => {
      mongoose.connect(`mongodb://${this.conf.db.HOST}:${this.conf.db.PORT}/${this.conf.db.DB}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          logger.info(`[cab_booking_system][dbs][mongo][successfully][connected_on] ${this.conf.db.HOST}:${this.conf.db.PORT}/${this.conf.db.DB}`);
          this.seed_roles()
          resolve();
        })
        .catch(err => {
          logger.error("[cab_booking_system][dbs][mongo][connection_error]", err);
          reject(err);
        })
    })
  }

  seed_roles() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        ROLES.forEach((role) => {
          new Role({
            name: role
          }).save(err => {
            if (err) {
              logger.error("[cab_booking_system][dbs][mongo][seed_roles][error]", err);
            } else {
              logger.info(`[cab_booking_system][dbs][mongo][role_added_successfully] ${role}`);
            }
          });
        })
      }
    });
  }
}

module.exports = MongoDB