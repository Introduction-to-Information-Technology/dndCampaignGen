import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.css';

const { render } = ReactDOM;


function Index() {
  return (
		<App/>
  );
}

render(
	<Provider store={store}>
		<Index/>
	</Provider>,
		document.getElementById('index'),
);

if (module.hot) {
  module.hot.accept();
}
