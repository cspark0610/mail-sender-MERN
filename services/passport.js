const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// para importar el modelo de mongoose User
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	User.findById(userId).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//usar ternario dependiendo si es == dev o == prod, usar path absolutos, o modificar el proxy de heroku dejandolo como esta
			callbackURL: "/auth/google/callback",
			proxy: true,
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					// usuario existe, no es necesario crear una nueva instancia del modelo User, llamamos al callback de passport done()
					done(null, existingUser);
				}
				// usuario no existe: crear un nuevo registro y guardarlo en DB
				new User({ googleId: profile.id }).save().then((newUser) => done(null, newUser));
			});
		}
	)
);
