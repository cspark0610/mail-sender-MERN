const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		["/api", "/auth/google"],
		createProxyMiddleware({
			target: "http://localhost:6000",
		})
	);
	app.use(
		["/api/current_user"],
		createProxyMiddleware({
			target: "http://localhost:6000/api/current_user",
		})
	);
	app.use(
		["/api/stripe"],
		createProxyMiddleware({
			target: "http://localhost:6000/api/stripe",
		})
	);
};

// hay q setear luego un proxy rule, en setupProxy.js para cada ruta del front
