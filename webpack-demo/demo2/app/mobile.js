import './index.scss';
import './main.css';
import './plugin.js';

$(document).ready(function(){
	let app = document.createElement('div');
	app.innerHTML = '<h1>Hello World! Mobile!</h1>';
	document.body.appendChild(app);
	$('h1').greenify();
});