const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");

const surveysSchema = new Schema({
	title: String,
	body: String,
	subject: String,
	// subdocument collection
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// assign a ref relation to the user model, each survey belongs to a user
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	dateSent: Date,
	lastResponded: Date,
});

mongoose.model("surveys", surveysSchema);
