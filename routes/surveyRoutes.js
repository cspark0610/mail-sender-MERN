const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

module.exports = (app) => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		});
		// no es necesario traer la lista de recipients para cada survey
		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", async (req, res) => {
		res.send("thanks for voting!");
	});

	//sendgrid webhook
	app.post("/api/surveys/webhooks", async (req, res) => {
		const path = new Path("/api/surveys/:surveyId/:choice");
		const events = _.map(req.body, ({ email, url }) => {
			const pathname = new URL(url).pathname; // /api/surveys/62a9d75f9ca5a62132709939/yes
			const match = path.test(pathname);
			if (match) {
				// { surveyId: '62a9d75f9ca5a62132709939', choice: 'yes' } match
				return { email, surveyId: match.surveyId, choice: match.choice };
			}
		});
		// compact eliminates undefined values in array
		const compactEvents = _.compact(events);
		// uniqBy eliminates duplicates searching by email and surveyId keys in objects
		const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
		const updatedEvents = _.each(uniqueEvents, ({ surveyId, email, choice }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false },
					},
				},
				{
					$inc: { [choice]: 1 },
					$set: { "recipients.$.responded": true },
				}
			).exec();
		});
		console.log(updatedEvents);
	});
	/*
			refactoring using lodash .chain()
			const events = _.chain(req.body)
										.map(({ email, url }) => {
											const match = path.test(new URL(url).pathname);
											if (match) {
												return { email, surveyId: match.surveyId, choice: match.choice };
											}
										})
										.compact()
										.uniqBy("email", "surveyId")
										.value();
		*/

	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		// going to receive as recipients: "ex1@gmail.com,ex2@gmail.com,ex3@gmail.com" as string comma separated
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});
		// after creating a survey instance we want to send a mail to each recipient using Mailer class
		// create an instance of Mailer class called mailer passing survey object as argument, and template (function that returns html as string)
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			//call send method of mailer class
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
