// common js modules imports in backend
const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({
		hello: "world",
	});
});

//dinamically port listening for heroku deployment
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log("server started at port 6000");
});
