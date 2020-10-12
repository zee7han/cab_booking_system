const {
	PORT,
	ENV
} = require('./constant');
const conf = require("./config/environment.config")[ENV]
const logger = require('./utilities/logger')(__filename);
const app = require('./config/express.config');

// Initializing the database pool connection.
const db = require("./dbs/mongo")
new db(conf).initialize()

app.listen(PORT, (err) => {
	if (err) {
		return logger.error('[cab_booking_system][index][server_start_error]', err);
	}
	return logger.info(`[cab_booking_system][server_start_successfully][for] ${ENV} [on_port] ${PORT}`);
});