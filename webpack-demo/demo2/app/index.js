// //引入scss，css
// require('./index.scss');
// require('./main.css');

// //模块引入
// var sub = require('./sub.js');
// var app = document.createElement('div');
// app.innerHTML = '<h1>Hello World! Why?</h1>';
// document.body.appendChild(app);
// app.appendChild(sub());

// //引入jquery，moment等库
// var $ = require('jquery');
// var moment = require('moment');
// $('body').append('<p>look at me! now is ' + moment().format() + '</p>');


//es6
import './index.scss';
import './main.css';
import generateText from './sub';
import moment from 'moment';
import './plugin.js';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {
	$('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>');
	$('p').greenify();
});
app.innerHTML = '<h1>Hello World! Why?</h1>';
document.body.appendChild(app);
app.appendChild(generateText());