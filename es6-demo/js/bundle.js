(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = query;

function query(id) {
	return document.querySelector(id);
}

module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsHome = require('./views/home');

var _viewsHome2 = _interopRequireDefault(_viewsHome);

var _viewsDetail = require('./views/detail');

var _viewsDetail2 = _interopRequireDefault(_viewsDetail);

var _viewsResult = require('./views/result');

var _viewsResult2 = _interopRequireDefault(_viewsResult);

var _viewsJoin = require('./views/join');

var _viewsJoin2 = _interopRequireDefault(_viewsJoin);

exports['default'] = {

	home: function home() {

		(0, _viewsHome2['default'])();
	},

	detail: function detail() {
		(0, _viewsDetail2['default'])();
	},

	result: function result() {
		(0, _viewsResult2['default'])();
	},

	join: function join() {
		(0, _viewsJoin2['default'])();
	}
};
module.exports = exports['default'];

},{"./views/detail":4,"./views/home":5,"./views/join":6,"./views/result":7}],3:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _handler = require("./handler");

var _handler2 = _interopRequireDefault(_handler);

dispatch.on("/home", _handler2["default"].home);

dispatch.on("/detail", _handler2["default"].detail);

dispatch.on("/result", _handler2["default"].result);

dispatch.on("/join", _handler2["default"].join);

dispatch.run();

},{"./handler":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var tpl = '\n\t<div>yupeng</div>\n';

function render(id1, id2) {
	_dom2['default'].query('page').innerHTML = tpl;
}

module.exports = exports['default'];

},{"../dom":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var tpl = '\n\t<div>yupeng</div>\n';

function render(id1, id2) {
	_dom2['default'].query('page').innerHTML = tpl;
}

module.exports = exports['default'];

},{"../dom":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var tpl = '\n\t<div>yupeng</div>\n';

function render(id1, id2) {
	return tpl;
}

module.exports = exports['default'];

},{"../dom":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dom = require('../dom');

var _dom2 = _interopRequireDefault(_dom);

var tpl = '\n\t<div>yupeng</div>\n';

function render(id1, id2) {
	_dom2['default'].query('page').innerHTML = tpl;
}

module.exports = exports['default'];

},{"../dom":1}]},{},[3]);
