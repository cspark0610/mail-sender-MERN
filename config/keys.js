// heroku ya tiene seteado una variable de entorno llamada NODE_ENV
if (process.env.NODE_ENV === "production") {
	//production environment
	module.exports = require("./prod");
} else {
	//in development environment
	module.exports = require("./dev");
}

// module.exports = {
// 	googleClientID: "304984529930-i17hsqst2fmkjgdtshlv3qtcpndie5e8.apps.googleusercontent.com",
// 	googleClientSecret: "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",
// 	mongoURI: "mongodb+srv://carlos:Plataforma5@cluster0.shsdz.mongodb.net/?retryWrites=true&w=majority",
// 	cookieKey: "123123123",
// };
