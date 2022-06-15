// common js modules imports in backend
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
//cambiar el orden del require debo requerir primero el modelo de mongoose antes de passport
require("./models/User");
require("./models/Survey");
require("./services/passport");
// to use it in node tereminal
// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"));
const app = express();

//en express cuando mando un body a traves de un post debo parserlo para tenerlo disponible en req.body!, usar body-parser como middleware
app.use(bodyParser.json());
// add middleware app.use() to add cookieSession to the request
app.use(
	cookieSession({
		// 30 days to cookie to last before expiring
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// have to provide a random string to encrypt the cookie inside keys property
		keys: [keys.cookieKey],
	})
);

// aca le decimos a passport que use cookies para manejar la authenticacion
// "passport": "^0.5.3", req.session.regenerate is not a function since upgrade to 0.6.0
app.use(passport.initialize());
app.use(passport.session());

// require all routes files modules
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// add routes handling validation in production mode
if (process.env.NODE_ENV === "production") {
	// express will serve up production assets, static files!!, like main.js or main.css
	app.use(express.static("client/build"));

	// express will serve up the index.html file if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
