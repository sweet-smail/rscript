import * as React from 'react';
import ReactDom from 'react-dom';
import App from './app';
if (module.hot) {
	module.hot.accept();
}
ReactDom.render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>,
	document.getElementById('root')
);
