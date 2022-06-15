// heroku ya tiene seteado una variable de entorno llamada NODE_ENV
if (process.env.NODE_ENV === "production") {
	//production environment
	module.exports = require("./prod");
} else {
	//in development environment
	module.exports = require("./dev");
}
