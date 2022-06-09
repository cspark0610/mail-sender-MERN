import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
	render() {
		// shows code when executed in browser
		// debugger;

		/*
    tokenRecieved, that represent the charged made to client: this token will be sent to the serverAPI to update user amount of credits he/she has
    Object { id: "tok_1L8mO2ArjKTacX7NlRUo9RRS", 
    object: "token", card: {…}, client_ip: "181.171.112.215", 
    created: 1654785062, email: "ghbfhd@ggmndki.com", livemode: false, type: "card", used: false }
    */
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={(tokenRecieved) => this.props.handleToken(tokenRecieved)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}
//only going to use actions creators from the actions folder, no need to pass mapStateToProps
export default connect(null, actions)(Payments);
