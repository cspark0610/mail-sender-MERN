// a middleware in express is a function that always takes these 3 parameters: req, res and next
module.exports = (req, res, next) => {
	if (!req.user) {
		res.status(401).send({ error: "You must log in!" });
	}
	// continue to the next middleware in chain
	next();
};
