import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// have to import css file with absolute path and clarifying file type
import "materialize-css/dist/css/materialize.min.css";

// create redux store
const store = createStore(reducers, {}, applyMiddleware(thunk));

// tengo que pasar una referencia en el 2do parametro al elemento html  que renderizara el componente App
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
