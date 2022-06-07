// common js modules imports in backend
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//cambiar el orden del require debo requerir primero el modelo de mongoose antes de passport
require("./models/User");
require("./services/passport");

mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"));
const app = express();

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

// initialize auth routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
