const passport = require("passport");

// el modulo exporta una funcion que recibe como parametro la instancia de express llamada app
module.exports = (app) => {
	// en esta ruta voy a obtener el "consent screen de google" en el cual se pide su profile y email
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})
	);

	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.send(req.user);
	});
};
