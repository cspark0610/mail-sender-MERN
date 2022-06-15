const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		["/api", "/auth/google"],
		createProxyMiddleware({
			target: "http://localhost:6000",
		})
	);
	app.use(
		["/api/**"],
		createProxyMiddleware({
			target: "http://localhost:6000/api/**",
		})
	);
};
