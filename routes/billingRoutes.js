const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
// want to use login middleware only in billing Routes so I have to add it in the middle of cb function without invoking it only pass a reference to middleware function
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "$5 for 5 email credits",
			source: req.body.id,
		});
		// add 5 credits in user model, which came in  req.user, which is given by passport strategy, i can get undefined as req.user
		// have to add requireLogin middleware

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
