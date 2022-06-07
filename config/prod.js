// use env variables
// do commit prod.js file for heroku to use them
// set env variables in your heroku app
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
};
