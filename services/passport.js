const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// para importar el modelo de mongoose User
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
	const user = await User.findById(userId);
	if (user) {
		return done(null, user);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback", // can use relative path when proxy prop is set to true
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				// usuario existe, no es necesario crear una nueva instancia del modelo User, llamamos al callback de passport done()
				return done(null, existingUser);
			}
			const newUser = await new User({ googleId: profile.id }).save();
			done(null, newUser);
		}
	)
);
