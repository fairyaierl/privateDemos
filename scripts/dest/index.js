(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var scheme_prefix = 'miui-music';

exports.scheme_prefix = scheme_prefix;
var domain = {
  api: 'http://v2.fm.duokanbox.com',
  search: 'http://music.search.xiaomi.net'
};

exports.domain = domain;
var default_cover = {
  album: 'img/album_default.png',
  artist: 'img/avatar_default.png',
  avatar: 'img/avatar_default.png'
};

exports.default_cover = default_cover;
var locale_list = ['bn-in', 'de', 'en-gb', 'en-in', 'en', 'es', 'fr', 'hi', 'in', 'it', 'kn-in', 'ml-in', 'mr-in', 'ms-my', 'pt-br', 'ro', 'ru', 'ta-in', 'te-in', 'th', 'tr', 'vi', 'zh-cn', 'zh-tw'];

exports.locale_list = locale_list;
var playlist = {
  all: '9223372036854775807',
  local: '9223372036854775800',
  favorite: '99',
  type: {
    normal: 0, // 用户自定义
    fm: 101, // 在线电台
    billboard: 102, // 在线榜单
    recommend: 103, // 在线推荐
    artist: 104, // 在线歌手
    album: 105, // 在线歌手的某个专辑
    all: 1008,

    search: 1001, // 输入确定
    instant: 1002, // 输入框提示
    suggest: 1005, // 搜索推荐

    hot_song: 1012
  },
  uri: {
    'private': 'content://com.miui.player.private/playlists'
  }
};
/*
let id_max = '9223372036854775807';
export var playlist = ['all', 'artist', 'album', 'nowplaying', 'none', 'create', 'my_playlist', 'local'].reduce((ret, k, i)=> {
  ret[k] = id_max.slice(0, -1) + (parseInt(id_max.slice(-1), 10) - i);
  return ret;
}, {});
var PLAYLIST_ID_GROUP_BY_ARTIST = Long.MAX_VALUE - 1;
var PLAYLIST_ID_GROUP_BY_ALBUM = Long.MAX_VALUE - 2;

var PLAYLIST_ID_NOWPLAYING = Long.MAX_VALUE - 3;
var PLAYLIST_ID_NONE = Long.MAX_VALUE - 4;
var PLAYLIST_ID_CREATE = Long.MAX_VALUE - 5;
var PLAYLIST_ID_MY_PLAYLIST_TITLE = Long.MAX_VALUE - 6;
var PLAYLIST_ID_LOCAL = Long.MAX_VALUE - 7;

*/
exports.playlist = playlist;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _load_image = require('./util');

//<https://github.com/steelbrain/dQuery>
//<http://www.ericponto.com/blog/2014/10/05/es6-dom-library/>

function d(q) {
  var target = arguments[1] === undefined ? document : arguments[1];

  return target.querySelector(q);
}

d.all = function (q) {
  var target = arguments[1] === undefined ? document : arguments[1];
  return [].slice.call(target.querySelectorAll(q));
};

//<https://github.com/madrobby/zepto/blob/master/src/touch.js>
d.press = function (el, fn) {
  var delay = 750;
  var delta = 30;
  var start = undefined;
  var timer = undefined;
  function clear(e) {
    var touch = e.touches[0];
    console.log(e.type, touch, start);
    if (timer && touch && Math.abs(touch.pageX - start.x) > delta && Math.abs(touch.pageY - start.y) > delta) {
      clearTimeout(timer);
    }
  }
  el.addEventListener('touchstart', function (e) {
    //console.log('start', e.currentTarget);
    start = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
    timer = setTimeout(fn, delay);
  }, false);
  el.addEventListener('touchmove', clear, false);
  el.addEventListener('touchend', clear, false);
};

d.update = function (selector, val) {
  var target = arguments[2] === undefined ? document : arguments[2];

  var el = d(selector, target);
  if (!el || !val) {
    return;
  }
  var attr = 'textContent';
  if (el.nodeName.toLowerCase() === 'img') {
    el.dataset.src = val;
    el.classList.add('lazy');
    _load_image.load_image(el);
    return;
  } else if (el.nodeName.toLowerCase() === 'a') {
    attr = 'href';
  }
  if (el[attr] !== val) {
    el[attr] = val;
  }
};

d.remove = function (el) {
  el.parentNode.removeChild(el);
};

d.shadow = function (el) {
  return el.createShadowRoot ? el.createShadowRoot() : el.webkitCreateShadowRoot();
};

exports['default'] = d;
module.exports = exports['default'];

},{"./util":7}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lazy_image$render$reset$parse_hash_query = require('./util');

var _dom = require('./dom');

var _dom2 = _interopRequireWildcard(_dom);

var _page_online = require('./view/page.online');

var _page_online2 = _interopRequireWildcard(_page_online);

var _page_local = require('./view/page.local');

var _page_local2 = _interopRequireWildcard(_page_local);

var _page_detail = require('./view/page.detail');

var _page_detail2 = _interopRequireWildcard(_page_detail);

var _page_artist = require('./view/page.artist');

var _page_artist2 = _interopRequireWildcard(_page_artist);

var _page_search = require('./view/page.search');

var _page_search2 = _interopRequireWildcard(_page_search);

var proxy = {
  page_local: _page_local2['default'],
  page_online: _page_online2['default']
};

exports['default'] = {
  home: function home() {
    var t = _lazy_image$render$reset$parse_hash_query.parse_hash_query().page !== 'online' ? 'local' : 'online';
    var root = _dom2['default']('#app');
    root.classList.add(root.className + '_' + t);
    proxy['page_' + t]();
  },

  more: function more() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _lazy_image$render$reset$parse_hash_query.render({
      url: '/' + args.join('/'),
      klass: ['box', 'single'],
      title: 'MORE', //TODO
      extra: function extra(x) {
        return '<div class="title">' + x.name + '</div>\n        <div class="desc">' + x.description + '</div>';
      }
    }).then(function (node) {
      _lazy_image$render$reset$parse_hash_query.reset('#app').appendChild(node);
      _lazy_image$render$reset$parse_hash_query.lazy_image();
    });
  },

  artist: function artist() {
    _page_artist2['default']();
  },

  detail: function detail(id) {
    _page_detail2['default'](id);
  },

  search: function search() {
    _page_search2['default']();
  },

  not_found: function not_found() {
    console.error('404 HANDLER NOT FOUND');
    //redirect to home_local
  }
};
module.exports = exports['default'];

},{"./dom":2,"./util":7,"./view/page.artist":10,"./view/page.detail":11,"./view/page.local":12,"./view/page.online":13,"./view/page.search":14}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//require("babelify/polyfill");
//<https://github.com/babel/babelify#es6-polyfill>

var _router = require('./router');

var _router2 = _interopRequireWildcard(_router);

_router2['default'].init();

},{"./router":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$URLBuilder = require('./util');

var _playlist = require('./config');

var miui = undefined;
var feature = {
  prefix: 'com.miui.player.hybrid.feature.',
  list: ['AddToPlaylist', 'AlertInput', 'AlertList', 'HandleUri', 'CreatePlaylist', 'DeletePlaylist', 'LoginAccount', 'RegisterBroadcastReceiver', 'RegisterDataCacheObserver', 'RegisterForegroundObserver', 'RegisterPlaylistObserver', 'RegisterPlaylistObserver', 'RegisterSearchInput', 'RegisterUriObserver', 'RequestNetwork', 'GetSearchHistory', 'UpdateSearchHistory', 'QueryUserInfo', 'QuerySearchInput', 'QueryAllTrackCount', 'QueryFavoriteArtistCount', 'QueryFavoriteTrackCount', 'QueryLocalTrackCount', 'QueryPlaylistTracks', 'QueryPlaylistList'],
  getter: function getter(name) {
    return ~feature.list.indexOf(name) ? feature.prefix + name : name;
  }
};
var config = {
  vendor: 'com.miui.player',
  timestamp: 0,
  signature: 'somesignature',
  features: feature.list.map(function (x) {
    return { name: feature.getter(x) };
  }),
  permissions: [{
    origin: 'content://com.miui.player.hybrid'
  }]
};

//<http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/>
function uuid() {
  return 'cb_' + 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 3 | 8;
    return v.toString(16);
  });
}

function mi() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var name = args[0];
  var param = args[2];
  var callback = args[3];

  //console.log([name, param, callback].join(' === '));

  if (!miui) {
    miui = window.MiuiJsBridge || {
      invoke: function invoke() {
        for (var _len2 = arguments.length, kargs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          kargs[_key2] = arguments[_key2];
        }

        return console.log('Error: miui is undefined; args: ' + kargs.join(', '));
      }
    };
    if (miui.config) {
      miui.config(JSON.stringify(config));
    }
  }

  args[0] = feature.getter(name);
  if (param && typeof param !== 'string') {
    args[2] = JSON.stringify(param);
  }

  args[3] = callback || 'notify';
  if (callback && typeof callback === 'function') {
    (function () {
      var method = uuid();
      window[method] = function (d) {
        //console.log(name + ' : ' + d);
        var obj = JSON.parse(d.replace(/[\n|\r]/g, ''));
        callback(obj.content);
        if (obj.code !== 10000) {
          //multiple callback from native
          setTimeout(function () {
            delete window[method];
          }, 3000);
        }
      };
      args[3] = method;
    })();
  }
  //console.log(args);
  var res = miui.invoke.apply(miui, args);
  //网络请求的返回值可能不是 json
  return name === 'RequestNetwork' ? res : JSON.parse(res);
}

//mi(feature.getter('RegisterForegroundObserver'), 'callback', null, (res)=> {
//console.log('on_rfo_callback: ', res);
//});

var count_dict = {
  all: 'QueryAllTrackCount',
  artist: 'QueryFavoriteArtistCount',
  favorite: 'QueryFavoriteTrackCount',
  local: 'QueryLocalTrackCount'
};

exports['default'] = {

  mi: mi,

  request: function request(param) {
    var res = mi('com.miui.player.hybrid.feature.RequestNetwork', 'sync', param, null);
    return res.content;
    //console.log(JSON.parse(a.content.replace('\r\n', '')));
  },

  count: Object.keys(count_dict).reduce(function (ret, k) {
    ret[k] = function (fn) {
      return mi(count_dict[k], 'callback', null, fn);
    };
    return ret;
  }, {}),

  playback: function playback() {
    var id = arguments[0] === undefined ? _playlist.playlist.all : arguments[0];
    var type = arguments[1] === undefined ? _playlist.playlist.type.all : arguments[1];
    var name = arguments[2] === undefined ? '全部歌曲' : arguments[2];
    var song_list = arguments[3] === undefined ? [] : arguments[3];
    var start = arguments[4] === undefined ? 0 : arguments[4];

    var ub = new _$URLBuilder.URLBuilder('service').append({
      id: id,
      start: start,
      type: encodeURIComponent(type),
      name: encodeURIComponent(name),
      songs: encodeURIComponent(JSON.stringify(song_list))
    }).done();
    return mi('HandleUri', 'sync', ub, null);
  },

  open: function open(e) {
    e.preventDefault();
    //console.log(e.delegateTarget);
    var url = e.delegateTarget.getAttribute('href');

    //XXX http for all env
    if (window.location.protocol === 'http:') {
      window.location.hash = url;
    } else {
      var ub = new _$URLBuilder.URLBuilder(url).replace('///', '//').append({ anim: 'slide' }).done();
      mi('HandleUri', 'sync', ub, null);
    }
  },

  playlist: {

    track: function track(id, fn) {
      return mi('QueryPlaylistTracks', 'callback', {
        playlistId: id
      }, fn);
    },

    mine: function mine(_x6, fn) {
      var id_list = arguments[0] === undefined ? null : arguments[0];

      var param = id_list ? { playlistIds: id_list } : null;
      return mi('QueryPlaylistList', 'callback', param, function (res) {
        res.list = res.list.filter(function (x) {
          return ! ~[99, 98, 96].indexOf(x._id);
        });
        fn(res);
      });
    },

    manage: function manage() {
      mi('AlertList', 'callback', {
        title: _$URLBuilder._('manage_playlist'),
        cancelable: true,
        items: ['rename', 'delete'].map(_$URLBuilder._)
      }, function (res) {
        console.log(res);
      });
    },

    add_song: function add_song(id) {
      var ub = new _$URLBuilder.URLBuilder('track_picker').append({ dest_playlist_id: id }).done();
      mi('HandleUri', 'sync', ub, null);
    },

    add_song2: function add_song2(param) {
      var _this = this;

      //自定义列表传 globalIds, 在线列表传 songs
      this.mine(function (pl) {
        mi('AlertList', 'callback', {
          title: _$URLBuilder._('addto_playlist'),
          cancelable: true,
          items: pl.list.reduce(function (ret, d) {
            ret.push(d.name);
            return ret;
          }, [_$URLBuilder._('create_playlist')])
        }, function (res) {
          if (res.action === 'clickitem') {
            if (res.selection === 0) {
              _this.create();
            } else {
              var sel = pl.list[res.selection - 1];
              param.playlistId = sel._id;
              mi('AddToPlaylist', 'sync', param, null);
            }
          }
        });
      });
    },

    create: function create(fn) {
      mi('AlertInput', 'callback', {
        title: _$URLBuilder._('dialog_title_add_playlist'),
        positiveText: _$URLBuilder._('ok'),
        negativeText: _$URLBuilder._('cancel'),
        cancelable: true,
        defaultText: _$URLBuilder._('new_playlist_name'),
        showInputMethod: true
      }, function (res) {
        if (res.action === 'positive' && res.input) {
          mi('CreatePlaylist', 'callback', {
            name: res.input,
            type: _playlist.playlist.type.normal
          }, fn);
        }
      });
    },

    favorite: function favorite(_ref) {
      var nid = _ref.nid;
      var intro = _ref.intro;
      var name = _ref.name;
      var pic_large_url = _ref.pic_large_url;
      var list = _ref.list;

      return mi('CreatePlaylist', 'sync', {
        //@FIXME type 103
        type: 103,
        name: name,
        globalId: nid,
        songs: list,
        descript: intro,
        iconUrl: pic_large_url
      }, null);
    },

    remove: function remove(id_list) {
      var callback = arguments[1] === undefined ? null : arguments[1];

      return mi('DeletePlaylist', callback ? 'callback' : 'sync', {
        playlistIds: id_list
      }, callback);
    }
  },

  search: {
    history: function history(param) {
      if (param) {
        return mi('UpdateSearchHistory', 'sync', param, null);
      } else {
        return mi('GetSearchHistory', 'sync', null, null);
      }
    }
  }

};
module.exports = exports['default'];

},{"./config":1,"./util":7}],6:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _delegate$parse_hash_url$request$splash = require('./util');

var _locale_list = require('./config');

var _handler = require('./handler');

var _handler2 = _interopRequireWildcard(_handler);

var _miui = require('./miui');

var _miui2 = _interopRequireWildcard(_miui);

var _dom = require('./dom');

var _dom2 = _interopRequireWildcard(_dom);

var impl = {
  root: _dom2['default']('#app'),
  dispatch: function dispatch() {
    _delegate$parse_hash_url$request$splash.splash();
    var args = _delegate$parse_hash_url$request$splash.parse_hash_url().split('?')[0].split('/');
    impl.root.className = args.reduce(function (ret, arg, idx) {
      ret.push('page_' + args.slice(0, idx + 1).join('_'));
      return ret;
    }, []).join(' ');
    (function () {
      return _handler2['default'][args[0]] || _handler2['default'].not_found;
    })().apply(undefined, _toConsumableArray(args.slice(1)));
  },
  load: function load() {
    impl.dispatch();
    impl.anchor();
  },
  anchor: function anchor() {
    impl.root.addEventListener('click', _delegate$parse_hash_url$request$splash.delegate(function (el) {
      return el.nodeName.toLowerCase() === 'a';
    }, _miui2['default'].open), false);
  },
  get_locale_url: function get_locale_url() {
    var lang = arguments[0] === undefined ? window.navigator.language.toLowerCase() : arguments[0];

    //let _lang = "zh-cn";
    var filtered = _locale_list.locale_list.filter(function (d) {
      return ~lang.indexOf(d);
    })[0] || 'en';
    return 'lang/lang.' + filtered + '.js';
  },
  update_lang: function update_lang(res) {
    window._ = function (k, v) {
      var obj = res[k];
      if (!obj) {
        console.error('locale key "' + k + '" not found');
        return k;
      }
      var ret = '';
      if (typeof obj === 'string') {
        ret = res[k];
      } else {
        var key = parseInt(v, 10) === 1 && obj.one ? 'one' : 'other';
        ret = obj[key].replace('${v}', v);
      }
      //console.log(ret, ret[0] + ret[ret.length - 1]);
      return ret[0] + ret[ret.length - 1] === '""' ? ret.slice(1, -1) : ret;
    };
  }
};

exports['default'] = {
  notify: function notify() {
    window.addEventListener('msg', function (e) {
      var msg = JSON.parse(e.body);
      console.log('on notify: ', msg, location.href);
    });
    window.notify = function (json_str) {
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent('msg', true, true);
      ev.body = json_str;
      window.dispatchEvent(ev);
    };
  },
  init: function init() {
    var _this = this;

    //console.log(location.href);
    _delegate$parse_hash_url$request$splash.request(impl.get_locale_url()).then(function (res) {
      _this.notify();
      impl.update_lang(res);
      impl.load();
      window.addEventListener('hashchange', impl.dispatch, false);
    });
  }
};
module.exports = exports['default'];

},{"./config":1,"./dom":2,"./handler":3,"./miui":5,"./util":7}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._ = _;
exports.reset = reset;
exports.splash = splash;
exports.request = request;
exports.render = render;
exports.load_image = load_image;

//<https://gist.github.com/aliem/2171438>
exports.lazy_image = lazy_image;

//<http://codepen.io/32bitkid/blog/understanding-delegated-javascript-events>
//<https://github.com/ccampbell/gator><https://github.com/ftlabs/ftdomdelegate>
exports.delegate = delegate;
exports.parse_hash_url = parse_hash_url;

//<https://github.com/sindresorhus/query-string>
exports.parse_hash_query = parse_hash_query;
exports.escape = escape;
exports.debounce = debounce;

var _default_cover$domain$playlist$scheme_prefix = require('./config');

var _dom = require('./dom');

var _dom2 = _interopRequireWildcard(_dom);

function _() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return window._.apply(window, args) || console.error.apply(console, args);
}

function reset(selector) {
  var scroll = arguments[1] === undefined ? true : arguments[1];

  var node = _dom2['default'](selector);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (scroll) {
    window.scrollTo(0, 0);
  }
  return node;
}

function splash() {
  var target = arguments[0] === undefined ? '#app' : arguments[0];

  var loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerHTML = '<img src="img/loading.png" />';
  reset(target).appendChild(loader);
}

function request(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var _url = url.replace('/detail/', '/channel/');
    if (window.location.protocol !== 'http:' && ! ~url.indexOf('lang') && ! ~url.indexOf('://')) {
      _url = _default_cover$domain$playlist$scheme_prefix.domain.api + _url;
    }
    xhr.open('get', _url);
    xhr.onerror = function () {
      return reject(xhr.statusText);
    };
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText);
          res.ref_url = url;
          resolve(res);
        }
      }
    };
    xhr.send();
  });
}

function _render(opt, res) {
  var wrap = document.createElement('div');
  if (opt.klass) {
    var _wrap$classList;

    (_wrap$classList = wrap.classList).add.apply(_wrap$classList, _toConsumableArray(opt.klass));
  }
  var cover_cls = 'cover lazy';
  var cover_src = _default_cover$domain$playlist$scheme_prefix.default_cover.album;
  if (_default_cover$domain$playlist$scheme_prefix.playlist.type.artist === opt.type) {
    cover_cls += ' artist';
    cover_src = _default_cover$domain$playlist$scheme_prefix.default_cover.artist;
  }
  if (opt.target === '#top') {
    res.list = res.list.filter(function (x) {
      return x.type === 'song';
    }).slice(0, 5);
  }
  var html = res.list.map(function (x) {
    if (opt.decorate) {
      x = opt.decorate(x);
    }

    var id = x.nid || x._id || x.artist_id || x.sid;
    var type = opt.type || x.list_type;
    var src = x.url || x.avatar_url || x.icon_url || x.cover_url;
    var rows = '<img class="' + cover_cls + '" src="' + cover_src + '" data-src="' + src + '" />' + opt.extra(x);
    if (wrap.classList.contains('single')) {
      rows = '<div class="row"><img class="' + cover_cls + '" src="' + cover_src + '" data-src="' + src + '" /></div>\n        <div class="row">' + opt.extra(x) + '</div>';
    }
    return '<a class="item" href="/detail/' + id + '?type=' + type + '" data-id="' + id + '">' + rows + '</a>';
  });

  wrap.innerHTML = (opt.title ? '<div class="hd">' + opt.title + '</div>' : '') + ('<div class="bd">' + html.join('') + '</div>');

  console.log(wrap);
  if (opt.more) {
    wrap.innerHTML += '<a class="ft more" href="' + opt.more.href + '">' + opt.more.title + '</a>';
  }
  if (opt.target) {
    _dom2['default'](opt.target).appendChild(wrap);
  }
  return wrap;
}

function render(opt, res) {
  if (opt.url) {
    return request(opt.url).then(function (o) {
      return _render(opt, o);
    });
  } else {
    return _render(opt, res);
  }
}

function load_image_when_visible(el) {
  var rect = el.getBoundingClientRect();
  var visible = rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  if (visible) {
    load_image(el);
  } else {
    return true;
  }
}

function load_image(el) {
  var src = el.dataset.src;
  if (!src || src === 'undefined') {
    el.classList.remove('lazy');
    el.classList.add('loaded', 'empty');
    return;
  }
  var img = new Image();
  img.onload = function () {
    el.src = src;
    el.classList.remove('lazy');
    el.classList.add('loaded');
  };
  img.src = src;
}

function lazy_image() {
  var list = _dom2['default'].all('.lazy');
  function reduce() {
    list = list.filter(load_image_when_visible);
    if (list.length === 0) {
      window.removeEventListener('scroll', reduce, false);
    }
  }
  reduce();
  window.addEventListener('scroll', reduce, false);
}

function delegate(criteria, listener) {
  return function (e) {
    e.preventDefault();
    var el = e.target;
    do {
      //console.log(el, criteria(el));
      if (!criteria(el)) {
        continue;
      }
      e.delegateTarget = el;
      listener.apply(this, arguments);
      return;
    } while (el = el.parentNode);
  };
}

function parse_hash_url() {
  var hash = arguments[0] === undefined ? window.location.hash : arguments[0];

  //let hash =  test_url || window.location.hash;
  var scheme = '#' + _default_cover$domain$playlist$scheme_prefix.scheme_prefix + '://';
  var url = ~hash.indexOf(_default_cover$domain$playlist$scheme_prefix.scheme_prefix) ? decodeURIComponent(hash).substr(scheme.length) : hash.substr(2);
  //return 'home';
  return url || scheme + 'home';
}

function parse_hash_query() {
  var url = arguments[0] === undefined ? parse_hash_url() : arguments[0];
  var def_page = arguments[1] === undefined ? 'online' : arguments[1];

  //let url = parse_hash_url(hash);
  var str = url.split('?')[1] || '';
  return str.trim().split('&').reduce(function (ret, param) {
    var _param$split = param.split('=');

    var _param$split2 = _slicedToArray(_param$split, 2);

    var k = _param$split2[0];
    var v = _param$split2[1];

    if (v) {
      ret[k] = decodeURIComponent(v);
      if (ret[k].indexOf('{') === 0 || ret[k].indexOf('[') === 0) {
        ret[k] = JSON.parse(ret[k]) || null;
      }
    }
    return ret;
  }, { page: def_page });
}

var URLBuilder = (function () {
  function URLBuilder(str) {
    _classCallCheck(this, URLBuilder);

    this.url = ~str.indexOf('://') ? str : 'miui-music://' + str;
  }

  _createClass(URLBuilder, [{
    key: 'replace',
    value: function replace() {
      var _url;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.url = (_url = this.url).replace.apply(_url, args);
      return this;
    }
  }, {
    key: 'append',
    value: function append(obj) {
      this.url = Object.keys(obj).reduce(function (ret, k) {
        var pipe = ~ret.indexOf('?') ? '&' : '?';
        ret += pipe + k + '=' + obj[k];
        return ret;
      }, this.url);
      return this;
    }
  }, {
    key: 'done',
    value: function done() {
      return this.url;
    }
  }]);

  return URLBuilder;
})();

exports.URLBuilder = URLBuilder;

function escape(str) {
  // 考虑重用
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function debounce(fn, delay, immediate) {
  var timer = null;
  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(undefined, args);
    }, delay);
  };
}

//console.js = (o)=> console.log(JSON.stringify(o, null, '  '));

//import 'object.observe';
//var object = { foo: null, list: [1, 2, 3] };
//Object.observe(object, function(changes) {
//console.log(changes);
//});

//object.foo = 'bar';
//object.list = [1, 9];
//setTimeout(()=> {
//object.foo = 'bar';
//object.list = [1, 2];
//}, 1000);

},{"./config":1,"./dom":2}],8:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$URLBuilder = require('../util');

var _playlist = require('../config');

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

var node = document.createElement('div');

function event(id, title, type, res) {
  node.addEventListener('click', function (e) {
    var klass = e.target.classList;
    if (klass.contains('play')) {
      _miui2['default'].playback(id, type, res.name, res.list);
    } else if (klass.contains('favorite')) {
      var r = _miui2['default'].playlist.favorite(res);
      //console.log(r);
      if (r.code === 0 && r.content) {
        klass.remove('favorite');
        klass.add('unfavorite');
      }
    } else if (klass.contains('unfavorite')) {
      var r = _miui2['default'].playlist.remove([id], false);
      //console.log(r);
      if (r.code === 0 && r.content) {
        klass.remove('unfavorite');
        klass.add('favorite');
      }
    } else if (klass.contains('multiple')) {
      _miui2['default'].open(new _$URLBuilder.URLBuilder('track_multichoice').append({
        id: id,
        type: type,
        name: encodeURIComponent(title)
      }).done());
    } else if (klass.contains('add_song')) {
      _miui2['default'].playlist.add_song();
    }
    //TODO download, share
  }, false);
}

function render(id, title, type, res) {
  //console.log(id, title, type);
  var list = ['download', 'favorite', 'share', 'play', 'multiple'];
  if (_playlist.playlist.type.normal === type) {
    list[2] = 'unfavorite';
    list[3] = 'add_song';
  }
  var html = list.map(function (d) {
    return '<span class="' + d + '"><i class="icon icon-' + d + '"></i>' + _$URLBuilder._('action_item_' + d) + '</span>';
  }).join('');
  //html += `<a href="/track_multichoice?type=${type}&id=${id}&name=${title}">${_('action_item_multiple')}</a>`;
  node.innerHTML = html;
  event(id, title, type, res);
  return node;
}

exports['default'] = render;
module.exports = exports['default'];

},{"../config":1,"../miui":5,"../util":7}],9:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('../util');

var _playlist = require('../config');

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

function compose(x) {
  var canvas = document.createElement('canvas');
  canvas.width = 1030;
  canvas.height = 580;
  var ctx = canvas.getContext('2d');

  var task = ['bg', 'head', 'text'].map(function (k) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.dataset.type = k;
      var src = x[k + '_url'] + '?w=360&h=50';
      img.onerror = function () {
        return reject(img);
      };
      img.onload = function () {
        return resolve(img);
      };
      //img.src = `content://com.miui.player.hybrid/http/${encodeURIComponent(src)}`;
      img.src = src;
    });
  });

  Promise.all(task).then(function (list) {
    list.forEach(function (img) {
      var dy = img.dataset.type === 'text' ? canvas.height - img.height : 0;
      ctx.drawImage(img, 0, dy, img.width, img.height);
    });
  });

  return canvas;
}

function redirect(url) {
  var type = url.hash ? url.hash.slice(1) : '';
  if (type === 'list') {
    type = 'billboard';
  }
  if (~['recommend', 'billboard', 'fm'].indexOf(type)) {
    var id = url.pathname.split('/').slice(-1);
    return '/detail/' + id + '?type=' + _playlist.playlist.type[type];
  } else if (type === 'artist') {
    return url.pathname + '?type=' + _playlist.playlist.type.artist;
  } else {
    //TODO type === browser?
    return '/web?url=' + encodeURIComponent(url.href);
  }
}

function render(target) {

  var node = document.createElement('div');
  node.classList.add('banner-wrap');
  node.innerHTML = '<div class="banner"></div><div class="indicator"></div>';
  target.appendChild(node);

  var current_cls = 'active';
  var banner = _dom2['default']('.banner', node);
  var indicator = _dom2['default']('.indicator', node);

  _request.request('/banner').then(function (res) {
    res.list.map(function (x, i) {
      var link = document.createElement('a');
      link.href = redirect(new URL(x.redirect));
      link.classList.add('item');
      if (i === 0) {
        link.classList.add('active');
      }
      link.appendChild(compose(x));
      banner.appendChild(link);
    });
    return res.list.length;
  }).then(function (len) {
    indicator.innerHTML = new Array(len + 1).join('<i></i>');
    indicator.querySelector('i').classList.add(current_cls);
    return len;
  }).then(function () {
    var item_list = banner.querySelectorAll('.item');
    var pos = 0;
    //TODO try requestAnimationFrame and canvas?
    setInterval(function () {
      pos++;
      if (pos >= item_list.length) {
        pos = 0;
      }
      banner.querySelector('.' + current_cls).classList.remove(current_cls);
      indicator.querySelector('.' + current_cls).classList.remove(current_cls);
      item_list[pos].classList.add(current_cls);
      indicator.querySelectorAll('i')[pos].classList.add(current_cls);
    }, 5000);
  });
}

exports['default'] = render;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../util":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$lazy_image$reset$render = require('../util');

var _default_cover$playlist = require('../config');

function output() {
  var node = document.createElement('div');
  node.innerHTML = '<div class="box single">\n    ' + ['男歌手', '女歌手', '团体'].map(function (k) {
    return '<div class="item">\n        <div class="row"><img src="' + _default_cover$playlist.default_cover.artist + '" class="cover artist" /></div>\n        <div class="row">\n          <div class="title">' + k + '</div>\n          <div class="desc">FIXME number </div>\n        </div>\n      </div>';
  }).join('') + '\n  </div>';
  _$lazy_image$reset$render.render({
    url: 'http://music.search.xiaomi.net/recommend/v6.1/homeartists?size=3', //FIXME region
    klass: ['box', 'single'],
    title: _$lazy_image$reset$render._('hot_artist'),
    type: _default_cover$playlist.playlist.type.artist,
    extra: function extra(x) {
      return '<div class="title">' + x.artist_name + '</div>';
    }
  }).then(function (el) {
    return node.appendChild(el);
  }).then(_$lazy_image$reset$render.lazy_image);
  _$lazy_image$reset$render.reset('#app').appendChild(node);
}

exports['default'] = output;
module.exports = exports['default'];

},{"../config":1,"../util":7}],11:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$escape$reset$request$parse_hash_query$URLBuilder = require('../util');

var _default_cover$playlist = require('../config');

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

var _action = require('./action');

var _action2 = _interopRequireWildcard(_action);

var id = undefined;
var type = parseInt(_$escape$reset$request$parse_hash_query$URLBuilder.parse_hash_query().type || 103, 10);

function event(res) {
  //console.log(res);
  var highlight = 'highlight';
  var song_list = _dom2['default'].all('.playlist .song');
  song_list.forEach(function (el, idx) {
    el.addEventListener('click', function () {
      var hl = _dom2['default']('.playlist .' + highlight);
      if (hl) {
        hl.classList.remove(highlight);
      }
      el.classList.add(highlight);
      _miui2['default'].playback(id, type, res.name, res.list, idx);
    }, false);
  });
}

function style(str) {
  var node = document.createElement('style');
  node.appendChild(document.createTextNode(str));
  document.head.appendChild(node);
}

function _render(res) {
  //console.log(res);
  var src = res.url || res.avatar_url || '';
  var title = res.name || res.artist_name || '';
  var cover_cls = src ? 'cover lazy' : 'cover';
  //TODO background gradient
  var bg_url = new _$escape$reset$request$parse_hash_query$URLBuilder.URLBuilder('content://com.miui.player.hybrid/http/' + encodeURIComponent(src)).append({
    type: 'img',
    blurRadius: 25,
    w: 400,
    h: 200
  }).done();
  style('body { background: 50% 0 / contain url(' + bg_url + ') no-repeat fixed; }');
  _$escape$reset$request$parse_hash_query$URLBuilder.reset('#app').innerHTML = '<div class="box detail">\n    <div class="row">\n      <img class="' + cover_cls + '" src="' + _default_cover$playlist.default_cover.album + '" data-src="' + src + '" />\n    </div>\n    <div class="row">\n      <div class="title">' + _$escape$reset$request$parse_hash_query$URLBuilder.escape(title) + '</div>\n      <div class="desc">' + _$escape$reset$request$parse_hash_query$URLBuilder._('Ntracks_count', res.count || res.list.length) + '</div>\n    </div>\n  </div>\n\n  <div class="box action"></div>\n\n  <ol class="box playlist">\n    ' + res.list.map(function (song, idx) {
    idx++;
    return '<li class="song" data-idx="' + idx + '">\n        <div class="row order">' + (idx < 10 ? '0' + idx : idx) + '</div>\n        <div class="row">\n          <div class="title">' + (song.name || song.title) + '</div>\n          <div class="desc">' + (song.album || song.album_name) + '</div>\n        </div>\n      </li>';
  }).join('') + '\n  </ol>';

  //<div id="similar"></div>`;

  _dom2['default']('.action').appendChild(_action2['default'](id, title, type, res));
  event(res);

  //FIXME with suggest
  //render({
  //url: '/category/13?size=6',
  //target: '#similar',
  //klass: ['box', 'normal'],
  //title: _('fragment_title_recommend'),
  //extra: (x)=> `<div class="title">${x.name || x.artist_name}</div>`
  //}).then(lazy_image);
}

function output(_id) {
  id = _id;

  if (_default_cover$playlist.playlist.type.normal === type) {
    _miui2['default'].playlist.track(id, function (res) {
      _miui2['default'].playlist.mine([id], function (d) {
        res.name = d.list[0].name;
        _render(res);
      });
    });
  } else if (_default_cover$playlist.playlist.type.artist === type) {
    Promise.all(['/artist/' + id, '/artist/' + id + '/music'].map(_$escape$reset$request$parse_hash_query$URLBuilder.request)).then(function (res) {
      res[0].list = res[1].list;
      _render(res[0]);
    });
  } else {
    _$escape$reset$request$parse_hash_query$URLBuilder.request('/detail/' + id + '?size=0').then(_render);
  }
}

exports['default'] = output;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../miui":5,"../util":7,"./action":8}],12:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$escape$debounce$lazy_image$render$reset = require('../util');

var _playlist = require('../config');

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

var _userinfo = require('./userinfo');

var _userinfo2 = _interopRequireWildcard(_userinfo);

var impl = {

  navigator: function navigator() {
    return [['all_tracks', 'all'], ['local_music', 'local'], ['favorite_playlist', 'favorite'], ['artist_view', 'artist']].map(function (d) {
      //let uri = (d[1] !== 'artist') ? `detail/${playlist[d[1]]}` : `${d[1]}/favorite`;
      return '<a class="item" href="' + d[1] + '_music">\n          <div class="title">' + _$escape$debounce$lazy_image$render$reset._(d[0]) + '</div>\n          <div class="desc" id="js_count_' + d[1] + '"></div>\n        </a>';
    }).join('');
  },

  playlist: function playlist() {
    _miui2['default'].playlist.mine(null, function (res) {
      _$escape$debounce$lazy_image$render$reset.reset('#mine', false).appendChild(_$escape$debounce$lazy_image$render$reset.render({
        klass: ['box', 'single'],
        title: _$escape$debounce$lazy_image$render$reset._('my_playlist'),
        extra: function extra(x) {
          return '<div class="title">' + _$escape$debounce$lazy_image$render$reset.escape(x.name) + '</div>\n          <div class="desc">' + _$escape$debounce$lazy_image$render$reset._('Ntracks_count', x.member_count) + '</div>';
        }
      }, res));
      _$escape$debounce$lazy_image$render$reset.lazy_image();
      //FIXME
      _dom2['default'].all('#mine .item').forEach(function (el) {
        _dom2['default'].press(el, function () {
          //let r = miui.playlist.remove([el.dataset.id], true);
          console.log(el, 'on press:');
        });
      });
    });
  },

  count: function count() {
    Object.keys(_miui2['default'].count).forEach(function (k) {
      _miui2['default'].count[k](function (res) {
        //try shadow dom?
        _dom2['default']('#js_count_' + k).textContent = _$escape$debounce$lazy_image$render$reset._('Ntracks_count', res.count);
      });
    });
  }
};

var on_change = _$escape$debounce$lazy_image$render$reset.debounce(function () {
  impl.count();
  impl.playlist();
}, 500);

function output() {
  _$escape$debounce$lazy_image$render$reset.reset('#app').innerHTML = '\n    <div id="userinfo"></div>\n    <div class="box navigator local">\n      <nav>' + impl.navigator() + '</nav>\n    </div>\n    <div id="suggest"></div>\n    <div id="mine"></div>\n    <div class="create"><img src="img/local_plus.png" />' + _$escape$debounce$lazy_image$render$reset._('create_playlist') + '</div>';

  _dom2['default']('#userinfo').appendChild(_userinfo2['default']());

  _miui2['default'].mi('RegisterDataCacheObserver', 'callback', { type: 'playlists_member_count' }, on_change);
  _miui2['default'].mi('RegisterDataCacheObserver', 'callback', { type: 'playlist_favorite_count' }, on_change);
  _miui2['default'].mi('RegisterUriObserver', 'callback', { uri: _playlist.playlist.uri['private'] }, on_change);

  impl.count();
  impl.playlist();

  _$escape$debounce$lazy_image$render$reset.render({
    url: '/category/7?size=2',
    target: '#suggest',
    klass: ['box', 'single'],
    title: _$escape$debounce$lazy_image$render$reset._('suggest_text'),
    extra: function extra(x) {
      return '<div class="title">' + x.name + '</div>\n      <div class="desc">' + x.description + '</div>';
    }
  }).then(_$escape$debounce$lazy_image$render$reset.lazy_image);

  _dom2['default']('.create').addEventListener('click', _$escape$debounce$lazy_image$render$reset.debounce(function () {
    _miui2['default'].playlist.create(function (res) {
      console.log(res);
      //impl.update.playlist();
    });
  }), false);
}

exports['default'] = output;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../miui":5,"../util":7,"./userinfo":15}],13:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$lazy_image$request$render$reset = require('../util');

var _default_cover$playlist = require('../config');

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

var _banner = require('./banner');

var _banner2 = _interopRequireWildcard(_banner);

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

function nav(target) {
  var enable_header = target === '#header';
  var wrap = document.createElement('div');
  wrap.classList.add('box', 'navigator', 'online');
  if (enable_header) {
    wrap.innerHTML = '<a href="/search" class="search">' + _$lazy_image$request$render$reset._('search_hint') + '</a>';
    _banner2['default'](wrap);
  }
  var el = document.createElement('nav');
  el.innerHTML = [['recommend', '/more/category/10?size=0'], ['artist', '/artist'], ['bill', '/more/category/7?size=0'], ['channel', '/more/category/12?size=0']].map(function (d) {
    return '<a href="' + d[1] + '">' + _$lazy_image$request$render$reset._('fragment_title_' + d[0]) + '</a>';
  }).join('');
  wrap.appendChild(el);
  _dom2['default'](target).appendChild(wrap);
}

function output() {
  var wrap = document.createElement('div');
  wrap.innerHTML = ['header', 'recommend', 'random', 'billboard', 'album', 'hot_song', 'fm', 'artist', 'footer'].map(function (id) {
    return '<div id="' + id + '"></div>';
  }).join('');
  _$lazy_image$request$render$reset.reset('#app').appendChild(wrap);
  ['#header', '#footer'].map(nav);

  var suggest = _miui2['default'].request({
    url: 'http://music.search.xiaomi.net/recommend/v6.1/sso/personallist',
    scheme: 'sso',
    method: 'get',
    body: '{count:3}',
    serviceId: 'miuimusic_search'
  });
  console.log('personal list :' + suggest);
  console.log(_$lazy_image$request$render$reset.render({
    target: '#random',
    type: _default_cover$playlist.playlist.type.billboard,
    klass: ['box', 'single'],
    title: _$lazy_image$request$render$reset._('suggest_text'),
    more: {
      title: _$lazy_image$request$render$reset._('more_suggest'),
      href: '/more/category/7?size=0'
    },
    extra: function extra(x) {
      return '<div class="title">' + x.name + '</div>\n      <div class="desc">' + x.description + '</div>';
    }
  }, JSON.parse(suggest)));

  var task = [{
    url: '/category/mobile/recommend?size=6',
    target: '#recommend',
    type: _default_cover$playlist.playlist.type.recommend,
    klass: ['box', 'normal'],
    title: _$lazy_image$request$render$reset._('fragment_title_recommend'),
    more: {
      title: _$lazy_image$request$render$reset._('more_recommend'),
      href: '/more/category/mobile/recommend?size=0'
    },
    extra: function extra(x) {
      return '<div class="title">' + x.name + '</div>';
    }
  }, {
    url: '/category/mobile/newest',
    target: '#album',
    type: _default_cover$playlist.playlist.type.album,
    klass: ['box', 'normal'],
    title: _$lazy_image$request$render$reset._('fragment_title_artist_album'),
    more: {
      title: _$lazy_image$request$render$reset._('more_album'),
      href: '/more/category/mobile/newest?size=0'
    },
    extra: function extra(x) {
      return '<div class="title">' + x.name + '</div>\n      <div class="desc">' + x.artist + '<em class="tag">' + x.description + '</em></div>';
    }
  }, {
    //url: `content://com.miui.player.hybrid/http/${encodeURIComponent('http://v2.fm.duokanbox.com/category/12?size=4')}`,
    url: '/category/mobile/fm?size=4',
    target: '#fm',
    type: _default_cover$playlist.playlist.type.fm,
    klass: ['box', 'single'],
    title: _$lazy_image$request$render$reset._('fragment_title_channel'),
    more: {
      title: _$lazy_image$request$render$reset._('more_fm'),
      href: '/more/category/mobile/fm?size=0'
    },
    extra: function extra(x) {
      return '<div class="title">' + x.name + '</div>\n      <div class="desc">' + x.description + '</div>';
    }
  }, {
    url: 'http://music.search.xiaomi.net/recommend/v6.1/homeartists?size=4',
    target: '#artist',
    type: _default_cover$playlist.playlist.type.artist,
    klass: ['box', 'single'],
    title: _$lazy_image$request$render$reset._('fragment_title_artist'),
    more: {
      title: _$lazy_image$request$render$reset._('more_artist'),
      href: '/artist'
    },
    extra: function extra(x) {
      return '<div class="title">' + x.artist_name + '</div>\n      <div class="desc">' + x.introduce + '</div>';
    }
  }].map(_$lazy_image$request$render$reset.render);

  //TODO download
  //console.log(miui.request({url:'http://v2.fm.duokanbox.com/channel/newest', scheme: 'http'}));
  //request('/detail/130').then((data)=> {
  task.push(_$lazy_image$request$render$reset.request('/detail/newest').then(function (res) {
    if (!res.list) {
      return console.error('[empty list]: ' + res.ref_url);
    }
    var hot_song = document.createElement('div');
    hot_song.classList.add('box', 'single');
    hot_song.innerHTML = '<div class="hd">' + _$lazy_image$request$render$reset._('track_main_fragment_tab_track') + '</div>\n      <div class="bd">' + res.list.map(function (x, i) {
      return '<div class="item song" data-idx="' + i + '">\n          <div class="row"><img class="cover lazy" src="' + _default_cover$playlist.default_cover.album + '" data-src="' + x.cover_url + '" /></div>\n          <div class="row">\n            <div class="title">' + x.name + '<span class="hq">HQ</span></div>\n            <div class="desc">' + x.artist_name + ' | ' + x.album_name + '</div>\n          </div>\n          <div class="row"><i class="icon icon-download"></i></div>\n        </div>';
    }).join('') + '</div>\n      <a class="ft more" href="/more">' + _$lazy_image$request$render$reset._('more_song') + '</a>';
    _dom2['default']('#hot_song').appendChild(hot_song);
    _dom2['default'].all('.song', hot_song).forEach(function (el) {
      el.addEventListener('click', function (e) {
        _miui2['default'].playback(null, _default_cover$playlist.playlist.type.hot_song, _$lazy_image$request$render$reset._('track_main_fragment_tab_track'), res.list, e.currentTarget.dataset.idx);
      }, false);
    });
  }));

  Promise.all(['http://music.search.xiaomi.net/recommend/v6.1/newsongrank?count=3', 'http://music.search.xiaomi.net/recommend/v6.1/topsongrank?count=3', 'http://music.search.xiaomi.net/recommend/v6.1/risesongrank?count=3'].map(_$lazy_image$request$render$reset.request)).then(function (list) {
    _$lazy_image$request$render$reset.render({
      target: '#billboard',
      type: _default_cover$playlist.playlist.type.billboard,
      klass: ['box', 'single'],
      title: _$lazy_image$request$render$reset._('fragment_title_bill'),
      more: {
        title: _$lazy_image$request$render$reset._('more_billboard'),
        href: '/more/category/mobile/list?size=0'
      },
      extra: function extra(x) {
        return '<div class="title">' + x.name + '</div>\n        <ul class="desc">\n          ' + x.list.map(function (d, i) {
          return '<li>' + (i + 1) + ' ' + d.name + ' - ' + d.artist_name + '</li>';
        }).join('') + '\n        </ul>';
      }
    }, { list: list });
  });

  Promise.all(task).then(_$lazy_image$request$render$reset.lazy_image);
}

exports['default'] = output;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../miui":5,"../util":7,"./banner":9}],14:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _$escape$lazy_image$reset$request$render$splash = require('../util');

var _default_cover$playlist = require('../config');

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

function tag() {
  _$escape$lazy_image$reset$request$render$splash.request('http://music.search.xiaomi.net/v61/topQueries?count=15').then(function (res) {
    _dom2['default']('.hot_tag .bd').innerHTML = res.result.map(function (_ref) {
      var name = _ref.name;
      return '<span class="query">' + name + '</span>';
    }).join('');
  });
}

function history() {
  var res = _miui2['default'].search.history();
  _dom2['default']('.history .bd').innerHTML = res.content.list.map(function (name) {
    return '<div class="query">' + _$escape$lazy_image$reset$request$render$splash.escape(decodeURIComponent(name)) + '</div>';
  }).join('');
}

function search(query) {
  var t = arguments[1] === undefined ? 'instant' : arguments[1];

  if (!query) {
    return;
  }
  if (! ~['instant', 'search', 'suggest'].indexOf(t)) {
    t = 'instant';
  }
  _$escape$lazy_image$reset$request$render$splash.splash('#app');
  _$escape$lazy_image$reset$request$render$splash.request('http://music.search.xiaomi.net/v61/${t}?q=' + query).then(function (res) {
    return res.list.reduce(function (ret, d) {
      ret[d.type] = ret[d.type] || [];
      ret[d.type].push(d);
      return ret;
    }, {});
  }).then(function (group) {
    _$escape$lazy_image$reset$request$render$splash.reset('#app');
    ['artist', 'album'].map(function (type) {
      if (!group[type]) {
        return;
      }
      _dom2['default']('#app').appendChild(_$escape$lazy_image$reset$request$render$splash.render({
        title: _$escape$lazy_image$reset$request$render$splash._(type),
        type: _default_cover$playlist.playlist.type[type],
        klass: ['box', 'single', 'result'],
        extra: function extra(x) {
          var ret = '<div class="title">' + (x.name || x.artist_name) + '</div>';
          if (type !== 'artist') {
            ret += '<div class="desc">' + (x.artist_name || '') + '</div>';
          }
          return ret;
        }
      }, { list: group[type] }));
    });
    return group.song;
  }).then(function (list) {
    var song_list = document.createElement('div');
    song_list.classList.add('box', 'single', 'result');
    song_list.innerHTML = '<div class="hd">' + _$escape$lazy_image$reset$request$render$splash._('song') + '</div>\n        <div class="bd">' + list.map(function (x, idx) {
      return '<div class="item song" data-idx="' + idx + '">\n            <div class="row"><img class="cover lazy" src="' + _default_cover$playlist.default_cover.album + '" data-src="' + x.cover_url + '" /></div>\n            <div class="row">\n              <div class="title">' + x.name + '</div>\n              <div class="desc">' + x.artist_name + '</div>\n            </div>\n          </div>';
    }).join('') + '</div>';
    _dom2['default']('#app').appendChild(song_list);
    _dom2['default'].all('.song', song_list).forEach(function (el) {
      el.addEventListener('click', function (e) {
        _miui2['default'].playback(null, _default_cover$playlist.playlist.type[t], query, list, e.currentTarget.dataset.idx);
      }, false);
    });
  }).then(_$escape$lazy_image$reset$request$render$splash.lazy_image);
}

function event() {
  _dom2['default']('#app').addEventListener('click', function (e) {
    var el = e.target;
    if (el.classList.contains('query')) {
      var data = encodeURIComponent(el.textContent.trim());
      _miui2['default'].search.history({
        data: data,
        type: 'add'
      });
      search(data, 'suggest');
    }
  }, false);
}

//FIXME with debounce
function on_change(res) {
  //console.log(res);
  var args = [res.data.text];
  if (res && res.data && res.data.type === 'submit') {
    _miui2['default'].search.history({
      data: res.data.text,
      type: 'add'
    });
    args.push('search');
  }
  search.apply(undefined, args);
}

function register() {
  _miui2['default'].mi('RegisterSearchInput', 'sync', null, on_change);
}

function output() {
  _$escape$lazy_image$reset$request$render$splash.reset('#app').innerHTML = '\n    <div class="box navigator search" hide>\n      <a href="">_(\'all_artist\')</a>\n      <a href="">_(\'听歌试曲\')</a>\n    </div>\n    <div class="box hot_tag">\n      <div class="hd">' + _$escape$lazy_image$reset$request$render$splash._('search_title') + '</div>\n      <div class="bd"></div>\n    </div>\n    <div  class="box history">\n      <div class="hd">' + _$escape$lazy_image$reset$request$render$splash._('history') + '</div>\n      <div class="bd"></div>\n    </div>';

  register();
  tag();
  history();
  event();
  //search('小水果');
}

exports['default'] = output;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../miui":5,"../util":7}],15:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('../util');

var _default_cover = require('../config');

var _miui = require('../miui');

var _miui2 = _interopRequireWildcard(_miui);

var _dom = require('../dom');

var _dom2 = _interopRequireWildcard(_dom);

var user = undefined;
var node = document.createElement('div');
var key = ['userName', 'userAvatarUrl', 'userId'];

function bind(name) {
  return 'bid="js_userinfo_' + name + '"';
}

function fetch() {
  _miui2['default'].mi('QueryUserInfo', 'callabck', null, function (res) {
    user = res;
    key.forEach(function (k) {
      var def = k === key[0] ? _import._('not_login') : '';
      _dom2['default'].update('[' + bind(k) + ']', res[k] || def, node);
    });
  });
}

function register() {
  _miui2['default'].mi('RegisterBroadcastReceiver', 'callback', 'android.accounts.LOGIN_ACCOUNTS_PRE_CHANGED', fetch);
}

function event() {
  // 最后一栏点击直接跳 settings
  _dom2['default'].all('.row', node).slice(0, -1).forEach(function (d) {
    d.addEventListener('click', function () {
      if (user.userId) {
        _miui2['default'].mi('HandleUri', 'sync', 'miui-music://settings?anim=slide', null);
      } else {
        _miui2['default'].mi('LoginAccount', 'callback', null, fetch);
      }
    }, false);
  });
}

function render() {
  node.classList.add('box', 'user_info');
  node.innerHTML = '<div class="row"><img class="cover avatar" src="' + _default_cover.default_cover.avatar + '" ' + bind('userAvatarUrl') + ' /></div>\n    <div class="row">\n      <div class="title" ' + bind('userName') + '>' + _import._('not_login') + '<span class="hq" ' + bind('level') + ' hide></span></div>\n      <div class="desc" ' + bind('title') + '></div>\n    </div>\n    <div class="row"><a href="settings">' + _import._('presonal_center') + '</a></div>';

  register();
  event();
  return node;
}

exports['default'] = render;
module.exports = exports['default'];

},{"../config":1,"../dom":2,"../miui":5,"../util":7}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmpzIiwic3JjL2RvbS5qcyIsInNyYy9oYW5kbGVyLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL21pdWkuanMiLCJzcmMvcm91dGVyLmpzIiwic3JjL3V0aWwuanMiLCJzcmMvdmlldy9hY3Rpb24uanMiLCJzcmMvdmlldy9iYW5uZXIuanMiLCJzcmMvdmlldy9wYWdlLmFydGlzdC5qcyIsInNyYy92aWV3L3BhZ2UuZGV0YWlsLmpzIiwic3JjL3ZpZXcvcGFnZS5sb2NhbC5qcyIsInNyYy92aWV3L3BhZ2Uub25saW5lLmpzIiwic3JjL3ZpZXcvcGFnZS5zZWFyY2guanMiLCJzcmMvdmlldy91c2VyaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDOztRQUE3QixhQUFhLEdBQWIsYUFBYTtBQUVuQixJQUFNLE1BQU0sR0FBRztBQUNwQixLQUFHLEVBQUUsNEJBQTRCO0FBQ2pDLFFBQU0sRUFBRSxnQ0FBZ0M7Q0FDekMsQ0FBQzs7UUFIVyxNQUFNLEdBQU4sTUFBTTtBQUtaLElBQU0sYUFBYSxHQUFHO0FBQzNCLE9BQUssRUFBRSx1QkFBdUI7QUFDOUIsUUFBTSxFQUFFLHdCQUF3QjtBQUNoQyxRQUFNLEVBQUUsd0JBQXdCO0NBQ2pDLENBQUM7O1FBSlcsYUFBYSxHQUFiLGFBQWE7QUFNbkIsSUFBTSxXQUFXLEdBQUcsQ0FDekIsT0FBTyxFQUNQLElBQUksRUFDSixPQUFPLEVBQ1AsT0FBTyxFQUNQLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsSUFBSSxFQUNKLElBQUksRUFD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QW9CLElBQUksQ0FBQyxPQUFPLENBQUMscURBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMscUVBRUcsUUFoRGxDLENBQUMsQ0FnRG1DLGlCQUFpQixDQUFDLGVBQVksQ0FBQzs7QUFFekUsVUFBUSxFQUFFLENBQUM7QUFDWCxPQUFLLEVBQUUsQ0FBQztBQUNSLFNBQU8sSUFBSSxDQUFDO0NBQ2I7O3FCQUVjLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IHNjaGVtZV9wcmVmaXggPSAnbWl1aS1tdXNpYyc7XG5cbmV4cG9ydCBjb25zdCBkb21haW4gPSB7XG4gIGFwaTogJ2h0dHA6Ly92Mi5mbS5kdW9rYW5ib3guY29tJyxcbiAgc2VhcmNoOiAnaHR0cDovL211c2ljLnNlYXJjaC54aWFvbWkubmV0J1xufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRfY292ZXIgPSB7XG4gIGFsYnVtOiAnaW1nL2FsYnVtX2RlZmF1bHQucG5nJyxcbiAgYXJ0aXN0OiAnaW1nL2F2YXRhcl9kZWZhdWx0LnBuZycsXG4gIGF2YXRhcjogJ2ltZy9hdmF0YXJfZGVmYXVsdC5wbmcnXG59O1xuXG5leHBvcnQgY29uc3QgbG9jYWxlX2xpc3QgPSBbXG4gICdibi1pbicsXG4gICdkZScsXG4gICdlbi1nYicsXG4gICdlbi1pbicsXG4gICdlbicsXG4gICdlcycsXG4gICdmcicsXG4gICdoaScsXG4gICdpbicsXG4gICdpdCcsXG4gICdrbi1pbicsXG4gICdtbC1pbicsXG4gICdtci1pbicsXG4gICdtcy1teScsXG4gICdwdC1icicsXG4gICdybycsXG4gICdydScsXG4gICd0YS1pbicsXG4gICd0ZS1pbicsXG4gICd0aCcsXG4gICd0cicsXG4gICd2aScsXG4gICd6aC1jbicsXG4gICd6aC10dydcbl07XG5cbmV4cG9ydCBjb25zdCBwbGF5bGlzdCA9IHtcbiAgYWxsOiAnOTIyMzM3MjAzNjg1NDc3NTgwNycsXG4gIGxvY2FsOiAnOTIyMzM3MjAzNjg1NDc3NTgwMCcsXG4gIGZhdm9yaXRlOiAnOTknLFxuICB0eXBlOiB7XG4gICAgbm9ybWFsOiAwLCAgICAgIC8vIOeUqOaIt+iHquWumuS5iVxuICAgIGZtOiAxMDEsICAgICAgICAvLyDlnKjnur/nlLXlj7BcbiAgICBiaWxsYm9hcmQ6IDEwMiwgLy8g5Zyo57q/5qac5Y2VXG4gICAgcmVjb21tZW5kOiAxMDMsIC8vIOWcqOe6v+aOqOiNkFxuICAgIGFydGlzdDogMTA0LCAgICAvLyDlnKjnur/mrYzmiYtcbiAgICBhbGJ1bTogMTA1LCAgICAgLy8g5Zyo57q/5q2M5omL55qE5p+Q5Liq5LiT6L6RXG4gICAgYWxsOiAxMDA4LFxuXG4gICAgc2VhcmNoOiAxMDAxLCAgLy8g6L6T5YWl56Gu5a6aXG4gICAgaW5zdGFudDogMTAwMiwgLy8g6L6T5YWl5qGG5o+Q56S6XG4gICAgc3VnZ2VzdDogMTAwNSwgLy8g5pCc57Si5o6o6I2QXG5cbiAgICBob3Rfc29uZzogMTAxMlxuICB9LFxuICB1cmk6IHtcbiAgICBwcml2YXRlOiAnY29udGVudDovL2NvbS5taXVpLnBsYXllci5wcml2YXRlL3BsYXlsaXN0cydcbiAgfVxufTtcbi8qXG5sZXQgaWRfbWF4ID0gJzkyMjMzNzIwMzY4NTQ3NzU4MDcnO1xuZXhwb3J0IHZhciBwbGF5bGlzdCA9IFsnYWxsJywgJ2FydGlzdCcsICdhbGJ1bScsICdub3dwbGF5aW5nJywgJ25vbmUnLCAnY3JlYXRlJywgJ215X3BsYXlsaXN0JywgJ2xvY2FsJ10ucmVkdWNlKChyZXQsIGssIGkpPT4ge1xuICByZXRba10gPSBpZF9tYXguc2xpY2UoMCwgLTEpICsgKHBhcnNlSW50KGlkX21heC5zbGljZSgtMSksIDEwKSAtIGkpO1xuICByZXR1cm4gcmV0O1xufSwge30pO1xudmFyIFBMQVlMSVNUX0lEX0dST1VQX0JZX0FSVElTVCA9IExvbmcuTUFYX1ZBTFVFIC0gMTtcbnZhciBQTEFZTElTVF9JRF9HUk9VUF9CWV9BTEJVTSA9IExvbmcuTUFYX1ZBTFVFIC0gMjtcblxudmFyIFBMQVlMSVNUX0lEX05PV1BMQVlJTkcgPSBMb25nLk1BWF9WQUxVRSAtIDM7XG52YXIgUExBWUxJU1RfSURfTk9ORSA9IExvbmcuTUFYX1ZBTFVFIC0gNDtcbnZhciBQTEFZTElTVF9JRF9DUkVBVEUgPSBMb25nLk1BWF9WQUxVRSAtIDU7XG52YXIgUExBWUxJU1RfSURfTVlfUExBWUxJU1RfVElUTEUgPSBMb25nLk1BWF9WQUxVRSAtIDY7XG52YXIgUExBWUxJU1RfSURfTE9DQUwgPSBMb25nLk1BWF9WQUxVRSAtIDc7XG5cbiovXG4iLCJpbXBvcnQge2xvYWRfaW1hZ2V9IGZyb20gJy4vdXRpbCc7XG5cbi8vPGh0dHBzOi8vZ2l0aHViLmNvbS9zdGVlbGJyYWluL2RRdWVyeT5cbi8vPGh0dHA6Ly93d3cuZXJpY3BvbnRvLmNvbS9ibG9nLzIwMTQvMTAvMDUvZXM2LWRvbS1saWJyYXJ5Lz5cblxuZnVuY3Rpb24gZChxLCB0YXJnZXQ9ZG9jdW1lbnQpIHtcbiAgcmV0dXJuIHRhcmdldC5xdWVyeVNlbGVjdG9yKHEpO1xufVxuXG5kLmFsbCA9IChxLCB0YXJnZXQ9ZG9jdW1lbnQpPT4gW10uc2xpY2UuY2FsbCh0YXJnZXQucXVlcnlTZWxlY3RvckFsbChxKSk7XG5cbi8vPGh0dHBzOi8vZ2l0aHViLmNvbS9tYWRyb2JieS96ZXB0by9ibG9iL21hc3Rlci9zcmMvdG91Y2guanM+XG5kLnByZXNzID0gKGVsLCBmbik9PiB7XG4gIGxldCBkZWxheSA9IDc1MDtcbiAgbGV0IGRlbHRhID0gMzA7XG4gIGxldCBzdGFydDtcbiAgbGV0IHRpbWVyO1xuICBmdW5jdGlvbiBjbGVhcihlKSB7XG4gICAgbGV0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnNvbGUubG9nKGUudHlwZSwgdG91Y2gsIHN0YXJ0KTtcbiAgICBpZiAodGltZXIgJiYgdG91Y2hcbiAgICAgICAgJiYgTWF0aC5hYnModG91Y2gucGFnZVggLSBzdGFydC54KSA+IGRlbHRhXG4gICAgICAgICYmIE1hdGguYWJzKHRvdWNoLnBhZ2VZIC0gc3RhcnQueSkgPiBkZWx0YSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gIH1cbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKT0+IHtcbiAgICAvL2NvbnNvbGUubG9nKCdzdGFydCcsIGUuY3VycmVudFRhcmdldCk7XG4gICAgc3RhcnQgPSB7XG4gICAgICB4OiBlLnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICB5OiBlLnRvdWNoZXNbMF0ucGFnZVlcbiAgICB9O1xuICAgIHRpbWVyID0gc2V0VGltZW91dChmbiwgZGVsYXkpO1xuICB9LCBmYWxzZSk7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNsZWFyLCBmYWxzZSk7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgY2xlYXIsIGZhbHNlKTtcbn07XG5cbmQudXBkYXRlID0gKHNlbGVjdG9yLCB2YWwsIHRhcmdldD1kb2N1bWVudCk9PiB7XG4gIGxldCBlbCA9IGQoc2VsZWN0b3IsIHRhcmdldCk7XG4gIGlmICghZWwgfHwgIXZhbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgYXR0ciA9ICd0ZXh0Q29udGVudCc7XG4gIGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW1nJykge1xuICAgIGVsLmRhdGFzZXQuc3JjID0gdmFsO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xhenknKTtcbiAgICBsb2FkX2ltYWdlKGVsKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgYXR0ciA9ICdocmVmJztcbiAgfVxuICBpZiAoZWxbYXR0cl0gIT09IHZhbCkge1xuICAgIGVsW2F0dHJdID0gdmFsO1xuICB9XG59O1xuXG5kLnJlbW92ZSA9IChlbCk9PiB7XG4gIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xufTtcblxuZC5zaGFkb3cgPSAoZWwpPT4ge1xuICByZXR1cm4gZWwuY3JlYXRlU2hhZG93Um9vdCA/IGVsLmNyZWF0ZVNoYWRvd1Jvb3QoKSA6IGVsLndlYmtpdENyZWF0ZVNoYWRvd1Jvb3QoKTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZDtcbiIsImltcG9ydCB7bGF6eV9pbWFnZSwgcmVuZGVyLCByZXNldCwgcGFyc2VfaGFzaF9xdWVyeX0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHBhZ2Vfb25saW5lIGZyb20gJy4vdmlldy9wYWdlLm9ubGluZSc7XG5pbXBvcnQgcGFnZV9sb2NhbCBmcm9tICcuL3ZpZXcvcGFnZS5sb2NhbCc7XG5pbXBvcnQgcGFnZV9kZXRhaWwgZnJvbSAnLi92aWV3L3BhZ2UuZGV0YWlsJztcbmltcG9ydCBwYWdlX2FydGlzdCBmcm9tICcuL3ZpZXcvcGFnZS5hcnRpc3QnO1xuaW1wb3J0IHBhZ2Vfc2VhcmNoIGZyb20gJy4vdmlldy9wYWdlLnNlYXJjaCc7XG5cblxubGV0IHByb3h5ID0ge1xuICBwYWdlX2xvY2FsLFxuICBwYWdlX29ubGluZVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBob21lKCkge1xuICAgIGxldCB0ID0gKHBhcnNlX2hhc2hfcXVlcnkoKS5wYWdlICE9PSAnb25saW5lJykgPyAnbG9jYWwnIDogJ29ubGluZSc7XG4gICAgbGV0IHJvb3QgPSBkb20oJyNhcHAnKTtcbiAgICByb290LmNsYXNzTGlzdC5hZGQocm9vdC5jbGFzc05hbWUgKyAnXycgKyB0KTtcbiAgICBwcm94eVsncGFnZV8nICsgdF0oKTtcbiAgfSxcblxuICBtb3JlKC4uLmFyZ3MpIHtcbiAgICByZW5kZXIoe1xuICAgICAgdXJsOiAnLycgKyBhcmdzLmpvaW4oJy8nKSxcbiAgICAgIGtsYXNzOiBbJ2JveCcsICdzaW5nbGUnXSxcbiAgICAgIHRpdGxlOiAnTU9SRScsIC8vVE9ET1xuICAgICAgZXh0cmE6ICh4KT0+IGA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke3gubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4ke3guZGVzY3JpcHRpb259PC9kaXY+YFxuICAgIH0pLnRoZW4oKG5vZGUpPT4ge1xuICAgICAgcmVzZXQoJyNhcHAnKS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIGxhenlfaW1hZ2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhcnRpc3QoKSB7XG4gICAgcGFnZV9hcnRpc3QoKTtcbiAgfSxcblxuICBkZXRhaWwoaWQpIHtcbiAgICBwYWdlX2RldGFpbChpZCk7XG4gIH0sXG5cbiAgc2VhcmNoKCkge1xuICAgIHBhZ2Vfc2VhcmNoKCk7XG4gIH0sXG5cbiAgbm90X2ZvdW5kKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJzQwNCBIQU5ETEVSIE5PVCBGT1VORCcpO1xuICAgIC8vcmVkaXJlY3QgdG8gaG9tZV9sb2NhbFxuICB9XG59O1xuIiwiLy9yZXF1aXJlKFwiYmFiZWxpZnkvcG9seWZpbGxcIik7XG4vLzxodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWxpZnkjZXM2LXBvbHlmaWxsPlxuXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyJztcblxucm91dGVyLmluaXQoKTtcbiIsImltcG9ydCB7XywgVVJMQnVpbGRlcn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7cGxheWxpc3R9IGZyb20gJy4vY29uZmlnJztcblxubGV0IG1pdWk7XG5sZXQgZmVhdHVyZSA9IHtcbiAgcHJlZml4OiAnY29tLm1pdWkucGxheWVyLmh5YnJpZC5mZWF0dXJlLicsXG4gIGxpc3Q6IFtcbiAgICAnQWRkVG9QbGF5bGlzdCcsXG4gICAgJ0FsZXJ0SW5wdXQnLCAnQWxlcnRMaXN0JyxcbiAgICAnSGFuZGxlVXJpJywgJ0NyZWF0ZVBsYXlsaXN0JywgJ0RlbGV0ZVBsYXlsaXN0JywgJ0xvZ2luQWNjb3VudCcsXG4gICAgJ1JlZ2lzdGVyQnJvYWRjYXN0UmVjZWl2ZXInLFxuICAgICdSZWdpc3RlckRhdGFDYWNoZU9ic2VydmVyJyxcbiAgICAnUmVnaXN0ZXJGb3JlZ3JvdW5kT2JzZXJ2ZXInLFxuICAgICdSZWdpc3RlclBsYXlsaXN0T2JzZXJ2ZXInLFxuICAgICdSZWdpc3RlclBsYXlsaXN0T2JzZXJ2ZXInLFxuICAgICdSZWdpc3RlclNlYXJjaElucHV0JyxcbiAgICAnUmVnaXN0ZXJVcmlPYnNlcnZlcicsXG4gICAgJ1JlcXVlc3ROZXR3b3JrJyxcbiAgICAnR2V0U2VhcmNoSGlzdG9yeScsXG4gICAgJ1VwZGF0ZVNlYXJjaEhpc3RvcnknLFxuICAgICdRdWVyeVVzZXJJbmZvJyxcbiAgICAnUXVlcnlTZWFyY2hJbnB1dCcsXG4gICAgJ1F1ZXJ5QWxsVHJhY2tDb3VudCcsXG4gICAgJ1F1ZXJ5RmF2b3JpdGVBcnRpc3RDb3VudCcsXG4gICAgJ1F1ZXJ5RmF2b3JpdGVUcmFja0NvdW50JyxcbiAgICAnUXVlcnlMb2NhbFRyYWNrQ291bnQnLFxuICAgICdRdWVyeVBsYXlsaXN0VHJhY2tzJyxcbiAgICAnUXVlcnlQbGF5bGlzdExpc3QnXG4gIF0sXG4gIGdldHRlcjogKG5hbWUpPT4ge1xuICAgIHJldHVybiAofmZlYXR1cmUubGlzdC5pbmRleE9mKG5hbWUpKSA/IGZlYXR1cmUucHJlZml4ICsgbmFtZSA6IG5hbWU7XG4gIH1cbn07XG5jb25zdCBjb25maWcgPSB7XG4gIHZlbmRvcjogJ2NvbS5taXVpLnBsYXllcicsXG4gIHRpbWVzdGFtcDogMCxcbiAgc2lnbmF0dXJlOiAnc29tZXNpZ25hdHVyZScsXG4gIGZlYXR1cmVzOiBmZWF0dXJlLmxpc3QubWFwKCh4KT0+IHtcbiAgICByZXR1cm4ge25hbWU6IGZlYXR1cmUuZ2V0dGVyKHgpfTtcbiAgfSksXG4gIHBlcm1pc3Npb25zOiBbe1xuICAgIG9yaWdpbjogJ2NvbnRlbnQ6Ly9jb20ubWl1aS5wbGF5ZXIuaHlicmlkJ1xuICB9XVxufTtcblxuXG4vLzxodHRwOi8vYnlyb25zYWxhdS5jb20vYmxvZy9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkLWluLWphdmFzY3JpcHQvPlxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuICdjYl8nICsgJ3h4eHh4eHh4X3h4eHhfNHh4eF95eHh4X3h4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYyk9PiB7XG4gICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtaSguLi5hcmdzKSB7XG4gIGxldCBbbmFtZSwgLCBwYXJhbSwgY2FsbGJhY2tdID0gYXJncztcbiAgLy9jb25zb2xlLmxvZyhbbmFtZSwgcGFyYW0sIGNhbGxiYWNrXS5qb2luKCcgPT09ICcpKTtcblxuICBpZiAoIW1pdWkpIHtcbiAgICBtaXVpID0gd2luZG93Lk1pdWlKc0JyaWRnZSB8fCB7XG4gICAgICBpbnZva2UoLi4ua2FyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdFcnJvcjogbWl1aSBpcyB1bmRlZmluZWQ7IGFyZ3M6ICcgKyBrYXJncy5qb2luKCcsICcpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChtaXVpLmNvbmZpZykge1xuICAgICAgbWl1aS5jb25maWcoSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7XG4gICAgfVxuICB9XG5cbiAgYXJnc1swXSA9IGZlYXR1cmUuZ2V0dGVyKG5hbWUpO1xuICBpZiAocGFyYW0gJiYgdHlwZW9mIHBhcmFtICE9PSAnc3RyaW5nJykge1xuICAgIGFyZ3NbMl0gPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gIH1cblxuICBhcmdzWzNdID0gY2FsbGJhY2sgfHwgJ25vdGlmeSc7XG4gIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsZXQgbWV0aG9kID0gdXVpZCgpO1xuICAgIHdpbmRvd1ttZXRob2RdID0gKGQpPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZyhuYW1lICsgJyA6ICcgKyBkKTtcbiAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGQucmVwbGFjZSgvW1xcbnxcXHJdL2csICcnKSk7XG4gICAgICBjYWxsYmFjayhvYmouY29udGVudCk7XG4gICAgICBpZiAob2JqLmNvZGUgIT09IDEwMDAwKSB7IC8vbXVsdGlwbGUgY2FsbGJhY2sgZnJvbSBuYXRpdmVcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICBkZWxldGUgd2luZG93W21ldGhvZF07XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgfVxuICAgIH07XG4gICAgYXJnc1szXSA9IG1ldGhvZDtcbiAgfVxuICAvL2NvbnNvbGUubG9nKGFyZ3MpO1xuICBsZXQgcmVzID0gbWl1aS5pbnZva2UoLi4uYXJncyk7XG4gIC8v572R57uc6K+35rGC55qE6L+U5Zue5YC85Y+v6IO95LiN5pivIGpzb25cbiAgcmV0dXJuIChuYW1lID09PSAnUmVxdWVzdE5ldHdvcmsnKSA/IHJlcyA6IEpTT04ucGFyc2UocmVzKTtcbn1cblxuXG4vL21pKGZlYXR1cmUuZ2V0dGVyKCdSZWdpc3RlckZvcmVncm91bmRPYnNlcnZlcicpLCAnY2FsbGJhY2snLCBudWxsLCAocmVzKT0+IHtcbiAgLy9jb25zb2xlLmxvZygnb25fcmZvX2NhbGxiYWNrOiAnLCByZXMpO1xuLy99KTtcblxubGV0IGNvdW50X2RpY3QgPSB7XG4gIGFsbDogJ1F1ZXJ5QWxsVHJhY2tDb3VudCcsXG4gIGFydGlzdDogJ1F1ZXJ5RmF2b3JpdGVBcnRpc3RDb3VudCcsXG4gIGZhdm9yaXRlOiAnUXVlcnlGYXZvcml0ZVRyYWNrQ291bnQnLFxuICBsb2NhbDogJ1F1ZXJ5TG9jYWxUcmFja0NvdW50J1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIG1pLFxuXG4gIHJlcXVlc3QocGFyYW0pIHtcbiAgICBsZXQgcmVzID0gbWkoJ2NvbS5taXVpLnBsYXllci5oeWJyaWQuZmVhdHVyZS5SZXF1ZXN0TmV0d29yaycsICdzeW5jJywgcGFyYW0sIG51bGwpO1xuICAgIHJldHVybiByZXMuY29udGVudDtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04ucGFyc2UoYS5jb250ZW50LnJlcGxhY2UoJ1xcclxcbicsICcnKSkpO1xuICB9LFxuXG4gIGNvdW50OiBPYmplY3Qua2V5cyhjb3VudF9kaWN0KS5yZWR1Y2UoKHJldCwgayk9PiB7XG4gICAgcmV0W2tdID0gKGZuKT0+IG1pKGNvdW50X2RpY3Rba10sICdjYWxsYmFjaycsIG51bGwsIGZuKTtcbiAgICByZXR1cm4gcmV0O1xuICB9LCB7fSksXG5cbiAgcGxheWJhY2soaWQ9cGxheWxpc3QuYWxsLCB0eXBlPXBsYXlsaXN0LnR5cGUuYWxsLCBuYW1lPSflhajpg6jmrYzmm7InLCBzb25nX2xpc3Q9W10sIHN0YXJ0PTApIHtcbiAgICBsZXQgdWIgPSBuZXcgVVJMQnVpbGRlcignc2VydmljZScpLmFwcGVuZCh7XG4gICAgICBpZCxcbiAgICAgIHN0YXJ0LFxuICAgICAgdHlwZTogZW5jb2RlVVJJQ29tcG9uZW50KHR5cGUpLFxuICAgICAgbmFtZTogZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpLFxuICAgICAgc29uZ3M6IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb25nX2xpc3QpKVxuICAgIH0pLmRvbmUoKTtcbiAgICByZXR1cm4gbWkoJ0hhbmRsZVVyaScsICdzeW5jJywgdWIsIG51bGwpO1xuICB9LFxuXG4gIG9wZW4oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvL2NvbnNvbGUubG9nKGUuZGVsZWdhdGVUYXJnZXQpO1xuICAgIGxldCB1cmwgPSBlLmRlbGVnYXRlVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgLy9YWFggaHR0cCBmb3IgYWxsIGVudlxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwOicpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdWIgPSBuZXcgVVJMQnVpbGRlcih1cmwpLnJlcGxhY2UoJy8vLycsICcvLycpLmFwcGVuZCh7YW5pbTogJ3NsaWRlJ30pLmRvbmUoKTtcbiAgICAgIG1pKCdIYW5kbGVVcmknLCAnc3luYycsIHViLCBudWxsKTtcbiAgICB9XG4gIH0sXG5cbiAgcGxheWxpc3Q6IHtcblxuICAgIHRyYWNrKGlkLCBmbikge1xuICAgICAgcmV0dXJuIG1pKCdRdWVyeVBsYXlsaXN0VHJhY2tzJywgJ2NhbGxiYWNrJywge1xuICAgICAgICBwbGF5bGlzdElkOiBpZFxuICAgICAgfSwgZm4pO1xuICAgIH0sXG5cbiAgICBtaW5lKGlkX2xpc3Q9bnVsbCwgZm4pIHtcbiAgICAgIGxldCBwYXJhbSA9IGlkX2xpc3QgPyB7cGxheWxpc3RJZHM6IGlkX2xpc3R9IDogbnVsbDtcbiAgICAgIHJldHVybiBtaSgnUXVlcnlQbGF5bGlzdExpc3QnLCAnY2FsbGJhY2snLCBwYXJhbSwgKHJlcyk9PiB7XG4gICAgICAgIHJlcy5saXN0ID0gcmVzLmxpc3QuZmlsdGVyKCh4KSA9PiAhKH5bOTksIDk4LCA5Nl0uaW5kZXhPZih4Ll9pZCkpKTtcbiAgICAgICAgZm4ocmVzKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBtYW5hZ2UoKSB7XG4gICAgICBtaSgnQWxlcnRMaXN0JywgJ2NhbGxiYWNrJywge1xuICAgICAgICAndGl0bGUnOiBfKCdtYW5hZ2VfcGxheWxpc3QnKSxcbiAgICAgICAgJ2NhbmNlbGFibGUnOiB0cnVlLFxuICAgICAgICAnaXRlbXMnOiBbJ3JlbmFtZScsICdkZWxldGUnXS5tYXAoXylcbiAgICAgIH0sIChyZXMpPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFkZF9zb25nKGlkKSB7XG4gICAgICBsZXQgdWIgPSBuZXcgVVJMQnVpbGRlcigndHJhY2tfcGlja2VyJykuYXBwZW5kKHtkZXN0X3BsYXlsaXN0X2lkOiBpZH0pLmRvbmUoKTtcbiAgICAgIG1pKCdIYW5kbGVVcmknLCAnc3luYycsIHViLCBudWxsKTtcbiAgICB9LFxuXG4gICAgYWRkX3NvbmcyKHBhcmFtKSB7Ly/oh6rlrprkuYnliJfooajkvKAgZ2xvYmFsSWRzLCDlnKjnur/liJfooajkvKAgc29uZ3NcbiAgICAgIHRoaXMubWluZSgocGwpPT4ge1xuICAgICAgICBtaSgnQWxlcnRMaXN0JywgJ2NhbGxiYWNrJywge1xuICAgICAgICAgICd0aXRsZSc6IF8oJ2FkZHRvX3BsYXlsaXN0JyksXG4gICAgICAgICAgJ2NhbmNlbGFibGUnOiB0cnVlLFxuICAgICAgICAgICdpdGVtcyc6IHBsLmxpc3QucmVkdWNlKChyZXQsIGQpPT4ge1xuICAgICAgICAgICAgcmV0LnB1c2goZC5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfSwgW18oJ2NyZWF0ZV9wbGF5bGlzdCcpXSlcbiAgICAgICAgfSwgKHJlcyk9PiB7XG4gICAgICAgICAgaWYgKHJlcy5hY3Rpb24gPT09ICdjbGlja2l0ZW0nKSB7XG4gICAgICAgICAgICBpZiAocmVzLnNlbGVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGV0IHNlbCA9IHBsLmxpc3RbcmVzLnNlbGVjdGlvbiAtIDFdO1xuICAgICAgICAgICAgICBwYXJhbS5wbGF5bGlzdElkID0gc2VsLl9pZDtcbiAgICAgICAgICAgICAgbWkoJ0FkZFRvUGxheWxpc3QnLCAnc3luYycsIHBhcmFtLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZShmbikge1xuICAgICAgbWkoJ0FsZXJ0SW5wdXQnLCAnY2FsbGJhY2snLCB7XG4gICAgICAgICd0aXRsZSc6IF8oJ2RpYWxvZ190aXRsZV9hZGRfcGxheWxpc3QnKSxcbiAgICAgICAgJ3Bvc2l0aXZlVGV4dCc6IF8oJ29rJyksXG4gICAgICAgICduZWdhdGl2ZVRleHQnOiBfKCdjYW5jZWwnKSxcbiAgICAgICAgJ2NhbmNlbGFibGUnOiB0cnVlLFxuICAgICAgICAnZGVmYXVsdFRleHQnOiBfKCduZXdfcGxheWxpc3RfbmFtZScpLFxuICAgICAgICAnc2hvd0lucHV0TWV0aG9kJzogdHJ1ZVxuICAgICAgfSwgKHJlcyk9PiB7XG4gICAgICAgIGlmIChyZXMuYWN0aW9uID09PSAncG9zaXRpdmUnICYmIHJlcy5pbnB1dCkge1xuICAgICAgICAgIG1pKCdDcmVhdGVQbGF5bGlzdCcsICdjYWxsYmFjaycsIHtcbiAgICAgICAgICAgIG5hbWU6IHJlcy5pbnB1dCxcbiAgICAgICAgICAgIHR5cGU6IHBsYXlsaXN0LnR5cGUubm9ybWFsXG4gICAgICAgICAgfSwgZm4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZmF2b3JpdGUoe25pZCwgaW50cm8sIG5hbWUsIHBpY19sYXJnZV91cmwsIGxpc3R9KSB7XG4gICAgICByZXR1cm4gbWkoJ0NyZWF0ZVBsYXlsaXN0JywgJ3N5bmMnLCB7XG4gICAgICAgIC8vQEZJWE1FIHR5cGUgMTAzXG4gICAgICAgIHR5cGU6IDEwMyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZ2xvYmFsSWQ6IG5pZCxcbiAgICAgICAgc29uZ3M6IGxpc3QsXG4gICAgICAgIGRlc2NyaXB0OiBpbnRybyxcbiAgICAgICAgaWNvblVybDogcGljX2xhcmdlX3VybFxuICAgICAgfSwgbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShpZF9saXN0LCBjYWxsYmFjaz1udWxsKSB7XG4gICAgICByZXR1cm4gbWkoJ0RlbGV0ZVBsYXlsaXN0JywgY2FsbGJhY2sgPyAnY2FsbGJhY2snIDogJ3N5bmMnLCB7XG4gICAgICAgIHBsYXlsaXN0SWRzOiBpZF9saXN0XG4gICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuICB9LFxuXG4gIHNlYXJjaDoge1xuICAgIGhpc3RvcnkocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbSkge1xuICAgICAgICByZXR1cm4gbWkoJ1VwZGF0ZVNlYXJjaEhpc3RvcnknLCAnc3luYycsIHBhcmFtLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaSgnR2V0U2VhcmNoSGlzdG9yeScsICdzeW5jJywgbnVsbCwgbnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG4iLCJpbXBvcnQge2RlbGVnYXRlLCBwYXJzZV9oYXNoX3VybCwgcmVxdWVzdCwgc3BsYXNofSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtsb2NhbGVfbGlzdH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IGhhbmRsZXIgZnJvbSAnLi9oYW5kbGVyJztcbmltcG9ydCBtaXVpIGZyb20gJy4vbWl1aSc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxubGV0IGltcGwgPSB7XG4gIHJvb3Q6IGRvbSgnI2FwcCcpLFxuICBkaXNwYXRjaCgpIHtcbiAgICBzcGxhc2goKTtcbiAgICBsZXQgYXJncyA9IHBhcnNlX2hhc2hfdXJsKCkuc3BsaXQoJz8nKVswXS5zcGxpdCgnLycpO1xuICAgIGltcGwucm9vdC5jbGFzc05hbWUgPSBhcmdzLnJlZHVjZSgocmV0LCBhcmcsIGlkeCk9PiB7XG4gICAgICByZXQucHVzaCgncGFnZV8nICsgYXJncy5zbGljZSgwLCBpZHggKyAxKS5qb2luKCdfJykpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LCBbXSkuam9pbignICcpO1xuICAgICgoKT0+IGhhbmRsZXJbYXJnc1swXV0gfHwgaGFuZGxlci5ub3RfZm91bmQpKCkoLi4uYXJncy5zbGljZSgxKSk7XG4gIH0sXG4gIGxvYWQoKSB7XG4gICAgaW1wbC5kaXNwYXRjaCgpO1xuICAgIGltcGwuYW5jaG9yKCk7XG4gIH0sXG4gIGFuY2hvcigpIHtcbiAgICBpbXBsLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgZGVsZWdhdGUoKGVsKT0+IHtcbiAgICAgICAgcmV0dXJuIGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJztcbiAgICAgIH0sIG1pdWkub3BlbiksIGZhbHNlKTtcbiAgfSxcbiAgZ2V0X2xvY2FsZV91cmwobGFuZz13aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAvL2xldCBfbGFuZyA9IFwiemgtY25cIjtcbiAgICBsZXQgZmlsdGVyZWQgPSBsb2NhbGVfbGlzdC5maWx0ZXIoIChkKT0+IH5sYW5nLmluZGV4T2YoZCkgKVswXSB8fCAnZW4nO1xuICAgIHJldHVybiBgbGFuZy9sYW5nLiR7ZmlsdGVyZWR9LmpzYDtcbiAgfSxcbiAgdXBkYXRlX2xhbmcocmVzKSB7XG4gICAgd2luZG93Ll8gPSAoaywgdik9PiB7XG4gICAgICBsZXQgb2JqID0gcmVzW2tdO1xuICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgbG9jYWxlIGtleSBcIiR7a31cIiBub3QgZm91bmRgKTtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgICB9XG4gICAgICBsZXQgcmV0ID0gJyc7XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0ID0gcmVzW2tdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGtleSA9IChwYXJzZUludCh2LCAxMCkgPT09IDEgJiYgb2JqLm9uZSkgPyAnb25lJyA6ICdvdGhlcic7XG4gICAgICAgIHJldCA9IG9ialtrZXldLnJlcGxhY2UoJyR7dn0nLCB2KTtcbiAgICAgIH1cbiAgICAgIC8vY29uc29sZS5sb2cocmV0LCByZXRbMF0gKyByZXRbcmV0Lmxlbmd0aCAtIDFdKTtcbiAgICAgIHJldHVybiAocmV0WzBdICsgcmV0W3JldC5sZW5ndGggLSAxXSA9PT0gJ1wiXCInKSA/IHJldC5zbGljZSgxLCAtMSkgOiByZXQ7XG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBub3RpZnkoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21zZycsIChlKT0+IHtcbiAgICAgIGxldCBtc2cgPSBKU09OLnBhcnNlKGUuYm9keSk7XG4gICAgICBjb25zb2xlLmxvZygnb24gbm90aWZ5OiAnLCBtc2csIGxvY2F0aW9uLmhyZWYpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5ub3RpZnkgPSAoanNvbl9zdHIpPT4ge1xuICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2LmluaXRFdmVudCgnbXNnJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBldi5ib2R5ID0ganNvbl9zdHI7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldik7XG4gICAgfTtcbiAgfSxcbiAgaW5pdCgpIHtcbiAgICAvL2NvbnNvbGUubG9nKGxvY2F0aW9uLmhyZWYpO1xuICAgIHJlcXVlc3QoaW1wbC5nZXRfbG9jYWxlX3VybCgpKS50aGVuKChyZXMpID0+IHtcbiAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgICBpbXBsLnVwZGF0ZV9sYW5nKHJlcyk7XG4gICAgICBpbXBsLmxvYWQoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgaW1wbC5kaXNwYXRjaCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gIH1cbn07XG4iLCJpbXBvcnQge2RlZmF1bHRfY292ZXIsIGRvbWFpbiwgcGxheWxpc3QsIHNjaGVtZV9wcmVmaXh9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBfKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIHdpbmRvdy5fKC4uLmFyZ3MpIHx8IGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldChzZWxlY3Rvciwgc2Nyb2xsPXRydWUpIHtcbiAgbGV0IG5vZGUgPSBkb20oc2VsZWN0b3IpO1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICB9XG4gIGlmIChzY3JvbGwpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxhc2godGFyZ2V0PScjYXBwJykge1xuICBsZXQgbG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxvYWRlci5jbGFzc0xpc3QuYWRkKCdsb2FkZXInKTtcbiAgbG9hZGVyLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cImltZy9sb2FkaW5nLnBuZ1wiIC8+JztcbiAgcmVzZXQodGFyZ2V0KS5hcHBlbmRDaGlsZChsb2FkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCh1cmwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgbGV0IF91cmwgPSB1cmwucmVwbGFjZSgnL2RldGFpbC8nLCAnL2NoYW5uZWwvJyk7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2h0dHA6J1xuICAgICAgJiYgIX51cmwuaW5kZXhPZignbGFuZycpXG4gICAgICAmJiAhfnVybC5pbmRleE9mKCc6Ly8nKSkge1xuICAgICAgICBfdXJsID0gZG9tYWluLmFwaSArIF91cmw7XG4gICAgfVxuICAgIHhoci5vcGVuKCdnZXQnLCBfdXJsKTtcbiAgICB4aHIub25lcnJvciA9ICgpPT4gcmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcbiAgICB4aHIub25sb2FkID0gKCk9PiB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIHJlcy5yZWZfdXJsID0gdXJsO1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9yZW5kZXIob3B0LCByZXMpIHtcbiAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaWYgKG9wdC5rbGFzcykge1xuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCguLi5vcHQua2xhc3MpO1xuICB9XG4gIGxldCBjb3Zlcl9jbHMgPSAnY292ZXIgbGF6eSc7XG4gIGxldCBjb3Zlcl9zcmMgPSBkZWZhdWx0X2NvdmVyLmFsYnVtO1xuICBpZiAocGxheWxpc3QudHlwZS5hcnRpc3QgPT09IG9wdC50eXBlKSB7XG4gICAgY292ZXJfY2xzICs9ICcgYXJ0aXN0JztcbiAgICBjb3Zlcl9zcmMgPSBkZWZhdWx0X2NvdmVyLmFydGlzdDtcbiAgfVxuICBpZiAob3B0LnRhcmdldCA9PT0gJyN0b3AnKSB7XG4gICAgcmVzLmxpc3QgPSByZXMubGlzdC5maWx0ZXIoKHgpPT4geC50eXBlID09PSAnc29uZycpLnNsaWNlKDAsIDUpO1xuICB9XG4gIGxldCBodG1sID0gcmVzLmxpc3QubWFwKHggPT4ge1xuICAgIGlmIChvcHQuZGVjb3JhdGUpIHtcbiAgICAgIHggPSBvcHQuZGVjb3JhdGUoeCk7XG4gICAgfVxuXG4gICAgbGV0IGlkID0geC5uaWQgfHwgeC5faWQgfHwgeC5hcnRpc3RfaWQgfHwgeC5zaWQ7XG4gICAgbGV0IHR5cGUgPSBvcHQudHlwZSB8fCB4Lmxpc3RfdHlwZTtcbiAgICBsZXQgc3JjID0geC51cmwgfHwgeC5hdmF0YXJfdXJsIHx8IHguaWNvbl91cmwgfHwgeC5jb3Zlcl91cmw7XG4gICAgbGV0IHJvd3MgPSBgPGltZyBjbGFzcz1cIiR7Y292ZXJfY2xzfVwiIHNyYz1cIiR7Y292ZXJfc3JjfVwiIGRhdGEtc3JjPVwiJHtzcmN9XCIgLz4ke29wdC5leHRyYSh4KX1gO1xuICAgIGlmICh3cmFwLmNsYXNzTGlzdC5jb250YWlucygnc2luZ2xlJykpIHtcbiAgICAgIHJvd3MgPSBgPGRpdiBjbGFzcz1cInJvd1wiPjxpbWcgY2xhc3M9XCIke2NvdmVyX2Nsc31cIiBzcmM9XCIke2NvdmVyX3NyY31cIiBkYXRhLXNyYz1cIiR7c3JjfVwiIC8+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj4ke29wdC5leHRyYSh4KX08L2Rpdj5gO1xuICAgIH1cbiAgICByZXR1cm4gYDxhIGNsYXNzPVwiaXRlbVwiIGhyZWY9XCIvZGV0YWlsLyR7aWR9P3R5cGU9JHt0eXBlfVwiIGRhdGEtaWQ9XCIke2lkfVwiPiR7cm93c308L2E+YDtcbiAgfSk7XG5cbiAgd3JhcC5pbm5lckhUTUwgPSAob3B0LnRpdGxlID8gYDxkaXYgY2xhc3M9XCJoZFwiPiR7b3B0LnRpdGxlfTwvZGl2PmAgOiAnJykgK1xuICAgIGA8ZGl2IGNsYXNzPVwiYmRcIj4ke2h0bWwuam9pbignJyl9PC9kaXY+YDtcblxuICBjb25zb2xlLmxvZyh3cmFwKTtcbiAgaWYgKG9wdC5tb3JlKSB7XG4gICAgd3JhcC5pbm5lckhUTUwgKz0gYDxhIGNsYXNzPVwiZnQgbW9yZVwiIGhyZWY9XCIke29wdC5tb3JlLmhyZWZ9XCI+JHtvcHQubW9yZS50aXRsZX08L2E+YDtcbiAgfVxuICBpZiAob3B0LnRhcmdldCkge1xuICAgIGRvbShvcHQudGFyZ2V0KS5hcHBlbmRDaGlsZCh3cmFwKTtcbiAgfVxuICByZXR1cm4gd3JhcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihvcHQsIHJlcykge1xuICBpZiAob3B0LnVybCkge1xuICAgIHJldHVybiByZXF1ZXN0KG9wdC51cmwpLnRoZW4oKG8pPT4gX3JlbmRlcihvcHQsIG8pKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gX3JlbmRlcihvcHQsIHJlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbG9hZF9pbWFnZV93aGVuX3Zpc2libGUoZWwpIHtcbiAgbGV0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgbGV0IHZpc2libGUgPSAocmVjdC50b3AgPj0gMFxuICAgICYmIHJlY3QubGVmdCA+PSAwXG4gICAgJiYgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSk7XG4gIGlmICh2aXNpYmxlKSB7XG4gICAgbG9hZF9pbWFnZShlbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRfaW1hZ2UoZWwpIHtcbiAgbGV0IHNyYyA9IGVsLmRhdGFzZXQuc3JjO1xuICBpZiAoIXNyYyB8fCBzcmMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eScpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcsICdlbXB0eScpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gIGltZy5vbmxvYWQgPSAoKT0+IHtcbiAgICBlbC5zcmMgPSBzcmM7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eScpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICB9O1xuICBpbWcuc3JjID0gc3JjO1xufVxuXG4vLzxodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hbGllbS8yMTcxNDM4PlxuZXhwb3J0IGZ1bmN0aW9uIGxhenlfaW1hZ2UoKSB7XG4gIGxldCBsaXN0ID0gZG9tLmFsbCgnLmxhenknKTtcbiAgZnVuY3Rpb24gcmVkdWNlKCkge1xuICAgIGxpc3QgPSBsaXN0LmZpbHRlcihsb2FkX2ltYWdlX3doZW5fdmlzaWJsZSk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcmVkdWNlLCBmYWxzZSk7XG4gICAgfVxuICB9XG4gIHJlZHVjZSgpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcmVkdWNlLCBmYWxzZSk7XG59XG5cbi8vPGh0dHA6Ly9jb2RlcGVuLmlvLzMyYml0a2lkL2Jsb2cvdW5kZXJzdGFuZGluZy1kZWxlZ2F0ZWQtamF2YXNjcmlwdC1ldmVudHM+XG4vLzxodHRwczovL2dpdGh1Yi5jb20vY2NhbXBiZWxsL2dhdG9yPjxodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Z0ZG9tZGVsZWdhdGU+XG5leHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoY3JpdGVyaWEsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBlbCA9IGUudGFyZ2V0O1xuICAgIGRvIHtcbiAgICAgIC8vY29uc29sZS5sb2coZWwsIGNyaXRlcmlhKGVsKSk7XG4gICAgICBpZiAoIWNyaXRlcmlhKGVsKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBlbDtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm47XG4gICAgfSB3aGlsZSggKGVsID0gZWwucGFyZW50Tm9kZSkgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2hhc2hfdXJsKGhhc2g9d2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAvL2xldCBoYXNoID0gIHRlc3RfdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGxldCBzY2hlbWUgPSBgIyR7c2NoZW1lX3ByZWZpeH06Ly9gO1xuICAgIGxldCB1cmwgPSAofmhhc2guaW5kZXhPZihzY2hlbWVfcHJlZml4KSA/XG4gICAgICBkZWNvZGVVUklDb21wb25lbnQoaGFzaCkuc3Vic3RyKHNjaGVtZS5sZW5ndGgpIDpcbiAgICAgIGhhc2guc3Vic3RyKDIpKTtcbiAgICAvL3JldHVybiAnaG9tZSc7XG4gICAgcmV0dXJuIHVybCB8fCBzY2hlbWUgKyAnaG9tZSc7XG59XG5cbi8vPGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nPlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX2hhc2hfcXVlcnkodXJsPXBhcnNlX2hhc2hfdXJsKCksIGRlZl9wYWdlPSdvbmxpbmUnKSB7XG4gIC8vbGV0IHVybCA9IHBhcnNlX2hhc2hfdXJsKGhhc2gpO1xuICBsZXQgc3RyID0gdXJsLnNwbGl0KCc/JylbMV0gfHwgJyc7XG4gIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KCcmJykucmVkdWNlKChyZXQsIHBhcmFtKT0+IHtcbiAgICBsZXQgW2ssIHZdID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICBpZiAodikge1xuICAgICAgcmV0W2tdID0gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgaWYgKHJldFtrXS5pbmRleE9mKCd7JykgPT09IDAgfHwgcmV0W2tdLmluZGV4T2YoJ1snKSA9PT0gMCkge1xuICAgICAgICByZXRba10gPSBKU09OLnBhcnNlKHJldFtrXSkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSwgeyBwYWdlOiBkZWZfcGFnZSB9KTtcbn1cblxuZXhwb3J0IGNsYXNzIFVSTEJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihzdHIpIHtcbiAgICB0aGlzLnVybCA9IH5zdHIuaW5kZXhPZignOi8vJykgPyBzdHIgOiBgbWl1aS1tdXNpYzovLyR7c3RyfWA7XG4gIH1cbiAgcmVwbGFjZSguLi5hcmdzKSB7XG4gICAgdGhpcy51cmwgPSB0aGlzLnVybC5yZXBsYWNlKC4uLmFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFwcGVuZChvYmopIHtcbiAgICB0aGlzLnVybCA9IE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChyZXQsIGspPT4ge1xuICAgICAgbGV0IHBpcGUgPSB+cmV0LmluZGV4T2YoJz8nKSA/ICcmJyA6ICc/JztcbiAgICAgIHJldCArPSBwaXBlICsgayArICc9JyArIG9ialtrXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSwgdGhpcy51cmwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoc3RyKSB7XG4gIC8vIOiAg+iZkemHjeeUqFxuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXksIGltbWVkaWF0ZSkge1xuICBsZXQgdGltZXIgPSBudWxsO1xuICByZXR1cm4gKC4uLmFyZ3MpPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgZm4oLi4uYXJncyk7XG4gICAgfSwgZGVsYXkpO1xuICB9O1xufVxuXG4vL2NvbnNvbGUuanMgPSAobyk9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShvLCBudWxsLCAnICAnKSk7XG5cbi8vaW1wb3J0ICdvYmplY3Qub2JzZXJ2ZSc7XG4vL3ZhciBvYmplY3QgPSB7IGZvbzogbnVsbCwgbGlzdDogWzEsIDIsIDNdIH07XG4vL09iamVjdC5vYnNlcnZlKG9iamVjdCwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgIC8vY29uc29sZS5sb2coY2hhbmdlcyk7XG4vL30pO1xuXG4vL29iamVjdC5mb28gPSAnYmFyJztcbi8vb2JqZWN0Lmxpc3QgPSBbMSwgOV07XG4vL3NldFRpbWVvdXQoKCk9PiB7XG4gIC8vb2JqZWN0LmZvbyA9ICdiYXInO1xuICAvL29iamVjdC5saXN0ID0gWzEsIDJdO1xuLy99LCAxMDAwKTtcbiIsImltcG9ydCB7XywgVVJMQnVpbGRlcn0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge3BsYXlsaXN0fSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IG1pdWkgZnJvbSAnLi4vbWl1aSc7XG5cblxubGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuZnVuY3Rpb24gZXZlbnQoaWQsIHRpdGxlLCB0eXBlLCByZXMpIHtcbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICBsZXQga2xhc3MgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGtsYXNzLmNvbnRhaW5zKCdwbGF5JykpIHtcbiAgICAgIG1pdWkucGxheWJhY2soaWQsIHR5cGUsIHJlcy5uYW1lLCByZXMubGlzdCk7XG4gICAgfSBlbHNlIGlmIChrbGFzcy5jb250YWlucygnZmF2b3JpdGUnKSkge1xuICAgICAgbGV0IHIgPSBtaXVpLnBsYXlsaXN0LmZhdm9yaXRlKHJlcyk7XG4gICAgICAvL2NvbnNvbGUubG9nKHIpO1xuICAgICAgaWYgKHIuY29kZSA9PT0gMCAmJiByLmNvbnRlbnQpIHtcbiAgICAgICAga2xhc3MucmVtb3ZlKCdmYXZvcml0ZScpO1xuICAgICAgICBrbGFzcy5hZGQoJ3VuZmF2b3JpdGUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtsYXNzLmNvbnRhaW5zKCd1bmZhdm9yaXRlJykpIHtcbiAgICAgIGxldCByID0gbWl1aS5wbGF5bGlzdC5yZW1vdmUoW2lkXSwgZmFsc2UpO1xuICAgICAgLy9jb25zb2xlLmxvZyhyKTtcbiAgICAgIGlmIChyLmNvZGUgPT09IDAgJiYgci5jb250ZW50KSB7XG4gICAgICAgIGtsYXNzLnJlbW92ZSgndW5mYXZvcml0ZScpO1xuICAgICAgICBrbGFzcy5hZGQoJ2Zhdm9yaXRlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrbGFzcy5jb250YWlucygnbXVsdGlwbGUnKSkge1xuICAgICAgbWl1aS5vcGVuKG5ldyBVUkxCdWlsZGVyKCd0cmFja19tdWx0aWNob2ljZScpLmFwcGVuZCh7XG4gICAgICAgIGlkLFxuICAgICAgICB0eXBlLFxuICAgICAgICBuYW1lOiBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpXG4gICAgICB9KS5kb25lKCkpO1xuICAgIH0gZWxzZSBpZiAoa2xhc3MuY29udGFpbnMoJ2FkZF9zb25nJykpIHtcbiAgICAgIG1pdWkucGxheWxpc3QuYWRkX3NvbmcoKTtcbiAgICB9XG4gICAgLy9UT0RPIGRvd25sb2FkLCBzaGFyZVxuICB9LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihpZCwgdGl0bGUsIHR5cGUsIHJlcykge1xuICAvL2NvbnNvbGUubG9nKGlkLCB0aXRsZSwgdHlwZSk7XG4gIGxldCBsaXN0ID0gWydkb3dubG9hZCcsICdmYXZvcml0ZScsICdzaGFyZScsICdwbGF5JywgJ211bHRpcGxlJ107XG4gIGlmIChwbGF5bGlzdC50eXBlLm5vcm1hbCA9PT0gdHlwZSkge1xuICAgIGxpc3RbMl0gPSAndW5mYXZvcml0ZSc7XG4gICAgbGlzdFszXSA9ICdhZGRfc29uZyc7XG4gIH1cbiAgbGV0IGh0bWwgPSBsaXN0Lm1hcCgoZCk9PiBgPHNwYW4gY2xhc3M9XCIke2R9XCI+PGkgY2xhc3M9XCJpY29uIGljb24tJHtkfVwiPjwvaT4ke18oJ2FjdGlvbl9pdGVtXycgKyBkKX08L3NwYW4+YCkuam9pbignJyk7XG4gIC8vaHRtbCArPSBgPGEgaHJlZj1cIi90cmFja19tdWx0aWNob2ljZT90eXBlPSR7dHlwZX0maWQ9JHtpZH0mbmFtZT0ke3RpdGxlfVwiPiR7XygnYWN0aW9uX2l0ZW1fbXVsdGlwbGUnKX08L2E+YDtcbiAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICBldmVudChpZCwgdGl0bGUsIHR5cGUsIHJlcyk7XG4gIHJldHVybiBub2RlO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG4iLCJpbXBvcnQge3JlcXVlc3R9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtwbGF5bGlzdH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBkb20gZnJvbSAnLi4vZG9tJztcblxuXG5mdW5jdGlvbiBjb21wb3NlKHgpIHtcbiAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMud2lkdGggPSAxMDMwO1xuICBjYW52YXMuaGVpZ2h0ID0gNTgwO1xuICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgbGV0IHRhc2sgPSBbJ2JnJywgJ2hlYWQnLCAndGV4dCddLm1hcCgoayk9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5kYXRhc2V0LnR5cGUgPSBrO1xuICAgICAgbGV0IHNyYyA9IHhbayArICdfdXJsJ10gKyAnP3c9MzYwJmg9NTAnO1xuICAgICAgaW1nLm9uZXJyb3IgPSAoKT0+IHJlamVjdChpbWcpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpPT4gcmVzb2x2ZShpbWcpO1xuICAgICAgLy9pbWcuc3JjID0gYGNvbnRlbnQ6Ly9jb20ubWl1aS5wbGF5ZXIuaHlicmlkL2h0dHAvJHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX1gO1xuICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICB9KTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5hbGwodGFzaykudGhlbigobGlzdCk9PiB7XG4gICAgbGlzdC5mb3JFYWNoKChpbWcpPT4ge1xuICAgICAgbGV0IGR5ID0gKGltZy5kYXRhc2V0LnR5cGUgPT09ICd0ZXh0JykgPyBjYW52YXMuaGVpZ2h0IC0gaW1nLmhlaWdodCA6IDA7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgZHksIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBjYW52YXM7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0KHVybCkge1xuICBsZXQgdHlwZSA9IHVybC5oYXNoID8gdXJsLmhhc2guc2xpY2UoMSkgOiAnJztcbiAgaWYgKHR5cGUgPT09ICdsaXN0Jykge1xuICAgIHR5cGUgPSAnYmlsbGJvYXJkJztcbiAgfVxuICBpZiAoflsncmVjb21tZW5kJywgJ2JpbGxib2FyZCcsICdmbSddLmluZGV4T2YodHlwZSkpIHtcbiAgICBsZXQgaWQgPSB1cmwucGF0aG5hbWUuc3BsaXQoJy8nKS5zbGljZSgtMSk7XG4gICAgcmV0dXJuIGAvZGV0YWlsLyR7aWR9P3R5cGU9JHtwbGF5bGlzdC50eXBlW3R5cGVdfWA7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FydGlzdCcpIHtcbiAgICByZXR1cm4gdXJsLnBhdGhuYW1lICsgJz90eXBlPScgKyBwbGF5bGlzdC50eXBlLmFydGlzdDtcbiAgfSBlbHNlIHtcbiAgICAvL1RPRE8gdHlwZSA9PT0gYnJvd3Nlcj9cbiAgICByZXR1cm4gYC93ZWI/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybC5ocmVmKX1gO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlcih0YXJnZXQpIHtcblxuICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTGlzdC5hZGQoJ2Jhbm5lci13cmFwJyk7XG4gIG5vZGUuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJiYW5uZXJcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9kaXY+YDtcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIGxldCBjdXJyZW50X2NscyA9ICdhY3RpdmUnO1xuICBsZXQgYmFubmVyID0gZG9tKCcuYmFubmVyJywgbm9kZSk7XG4gIGxldCBpbmRpY2F0b3IgPSBkb20oJy5pbmRpY2F0b3InLCBub2RlKTtcblxuICByZXF1ZXN0KCcvYmFubmVyJykudGhlbigocmVzKT0+IHtcbiAgICByZXMubGlzdC5tYXAoKHgsIGkpPT4ge1xuICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBsaW5rLmhyZWYgPSByZWRpcmVjdChuZXcgVVJMKHgucmVkaXJlY3QpKTtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnaXRlbScpO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIGxpbmsuYXBwZW5kQ2hpbGQoY29tcG9zZSh4KSk7XG4gICAgICBiYW5uZXIuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5saXN0Lmxlbmd0aDtcbiAgfSkudGhlbigobGVuKT0+IHtcbiAgICBpbmRpY2F0b3IuaW5uZXJIVE1MID0gKG5ldyBBcnJheShsZW4gKyAxKSkuam9pbignPGk+PC9pPicpO1xuICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yKCdpJykuY2xhc3NMaXN0LmFkZChjdXJyZW50X2Nscyk7XG4gICAgcmV0dXJuIGxlbjtcbiAgfSkudGhlbigoKT0+IHtcbiAgICBsZXQgaXRlbV9saXN0ID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pdGVtJyk7XG4gICAgbGV0IHBvcyA9IDA7XG4gICAgLy9UT0RPIHRyeSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIGNhbnZhcz9cbiAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgIHBvcysrO1xuICAgICAgaWYgKHBvcyA+PSBpdGVtX2xpc3QubGVuZ3RoKSB7XG4gICAgICAgIHBvcyA9IDA7XG4gICAgICB9XG4gICAgICBiYW5uZXIucXVlcnlTZWxlY3RvcignLicgKyBjdXJyZW50X2NscykuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50X2Nscyk7XG4gICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvcignLicgKyBjdXJyZW50X2NscykuY2xhc3NMaXN0LnJlbW92ZShjdXJyZW50X2Nscyk7XG4gICAgICBpdGVtX2xpc3RbcG9zXS5jbGFzc0xpc3QuYWRkKGN1cnJlbnRfY2xzKTtcbiAgICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yQWxsKCdpJylbcG9zXS5jbGFzc0xpc3QuYWRkKGN1cnJlbnRfY2xzKTtcbiAgICB9LCA1MDAwKTtcblxuICB9KTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG4iLCJpbXBvcnQge18sIGxhenlfaW1hZ2UsIHJlc2V0LCByZW5kZXJ9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0X2NvdmVyLCBwbGF5bGlzdH0gZnJvbSAnLi4vY29uZmlnJztcblxuXG5mdW5jdGlvbiBvdXRwdXQoKSB7XG4gIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJib3ggc2luZ2xlXCI+XG4gICAgJHtbJ+eUt+atjOaJiycsICflpbPmrYzmiYsnLCAn5Zui5L2TJ10ubWFwKChrKT0+IHtcbiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPjxpbWcgc3JjPVwiJHtkZWZhdWx0X2NvdmVyLmFydGlzdH1cIiBjbGFzcz1cImNvdmVyIGFydGlzdFwiIC8+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke2t9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj5GSVhNRSBudW1iZXIgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICB9KS5qb2luKCcnKX1cbiAgPC9kaXY+YDtcbiAgcmVuZGVyKHtcbiAgICB1cmw6ICdodHRwOi8vbXVzaWMuc2VhcmNoLnhpYW9taS5uZXQvcmVjb21tZW5kL3Y2LjEvaG9tZWFydGlzdHM/c2l6ZT0zJywgLy9GSVhNRSByZWdpb25cbiAgICBrbGFzczogWydib3gnLCAnc2luZ2xlJ10sXG4gICAgdGl0bGU6IF8oJ2hvdF9hcnRpc3QnKSxcbiAgICB0eXBlOiBwbGF5bGlzdC50eXBlLmFydGlzdCxcbiAgICBleHRyYTogKHgpPT4gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7eC5hcnRpc3RfbmFtZX08L2Rpdj5gXG4gIH0pLnRoZW4oKGVsKT0+IG5vZGUuYXBwZW5kQ2hpbGQoZWwpKS50aGVuKGxhenlfaW1hZ2UpO1xuICByZXNldCgnI2FwcCcpLmFwcGVuZENoaWxkKG5vZGUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdXRwdXQ7XG4iLCJpbXBvcnQge18sIGVzY2FwZSwgcmVzZXQsIHJlcXVlc3QsIHBhcnNlX2hhc2hfcXVlcnksIFVSTEJ1aWxkZXJ9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0X2NvdmVyLCBwbGF5bGlzdH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBkb20gZnJvbSAnLi4vZG9tJztcbmltcG9ydCBtaXVpIGZyb20gJy4uL21pdWknO1xuaW1wb3J0IGFjdGlvbiBmcm9tICcuL2FjdGlvbic7XG5cblxubGV0IGlkO1xubGV0IHR5cGUgPSBwYXJzZUludChwYXJzZV9oYXNoX3F1ZXJ5KCkudHlwZSB8fCAxMDMsIDEwKTtcblxuZnVuY3Rpb24gZXZlbnQocmVzKSB7XG4gIC8vY29uc29sZS5sb2cocmVzKTtcbiAgbGV0IGhpZ2hsaWdodCA9ICdoaWdobGlnaHQnO1xuICBsZXQgc29uZ19saXN0ID0gZG9tLmFsbCgnLnBsYXlsaXN0IC5zb25nJyk7XG4gIHNvbmdfbGlzdC5mb3JFYWNoKChlbCwgaWR4KT0+IHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICAgICAgbGV0IGhsID0gZG9tKCcucGxheWxpc3QgLicgKyBoaWdobGlnaHQpO1xuICAgICAgaWYgKGhsKSB7XG4gICAgICAgIGhsLmNsYXNzTGlzdC5yZW1vdmUoaGlnaGxpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoaGlnaGxpZ2h0KTtcbiAgICAgIG1pdWkucGxheWJhY2soaWQsIHR5cGUsIHJlcy5uYW1lLCByZXMubGlzdCwgaWR4KTtcbiAgICB9LCBmYWxzZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHlsZShzdHIpIHtcbiAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5vZGUpO1xufVxuXG5mdW5jdGlvbiBfcmVuZGVyKHJlcykge1xuICAvL2NvbnNvbGUubG9nKHJlcyk7XG4gIGxldCBzcmMgPSByZXMudXJsIHx8IHJlcy5hdmF0YXJfdXJsIHx8ICcnO1xuICBsZXQgdGl0bGUgPSByZXMubmFtZSB8fCByZXMuYXJ0aXN0X25hbWUgfHwgJyc7XG4gIGxldCBjb3Zlcl9jbHMgPSBzcmMgPyAnY292ZXIgbGF6eScgOiAnY292ZXInO1xuICAvL1RPRE8gYmFja2dyb3VuZCBncmFkaWVudFxuICBsZXQgYmdfdXJsID0gbmV3IFVSTEJ1aWxkZXIoYGNvbnRlbnQ6Ly9jb20ubWl1aS5wbGF5ZXIuaHlicmlkL2h0dHAvJHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX1gKVxuICAgIC5hcHBlbmQoe1xuICAgICAgdHlwZTogJ2ltZycsXG4gICAgICBibHVyUmFkaXVzOiAyNSxcbiAgICAgIHc6IDQwMCxcbiAgICAgIGg6IDIwMFxuICAgIH0pLmRvbmUoKTtcbiAgc3R5bGUoYGJvZHkgeyBiYWNrZ3JvdW5kOiA1MCUgMCAvIGNvbnRhaW4gdXJsKCR7YmdfdXJsfSkgbm8tcmVwZWF0IGZpeGVkOyB9YCk7XG4gIHJlc2V0KCcjYXBwJykuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJib3ggZGV0YWlsXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGltZyBjbGFzcz1cIiR7Y292ZXJfY2xzfVwiIHNyYz1cIiR7ZGVmYXVsdF9jb3Zlci5hbGJ1bX1cIiBkYXRhLXNyYz1cIiR7c3JjfVwiIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHtlc2NhcGUodGl0bGUpfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4ke18oJ050cmFja3NfY291bnQnLCByZXMuY291bnQgfHwgcmVzLmxpc3QubGVuZ3RoKX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImJveCBhY3Rpb25cIj48L2Rpdj5cblxuICA8b2wgY2xhc3M9XCJib3ggcGxheWxpc3RcIj5cbiAgICAke3Jlcy5saXN0Lm1hcCgoc29uZywgaWR4KT0+IHtcbiAgICAgIGlkeCsrO1xuICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJzb25nXCIgZGF0YS1pZHg9XCIke2lkeH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBvcmRlclwiPiR7KGlkeCA8IDEwKSA/ICcwJyArIGlkeCA6IGlkeH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7c29uZy5uYW1lIHx8IHNvbmcudGl0bGV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4ke3NvbmcuYWxidW0gfHwgc29uZy5hbGJ1bV9uYW1lfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+YDtcbiAgICB9KS5qb2luKCcnKX1cbiAgPC9vbD5gO1xuXG4gIC8vPGRpdiBpZD1cInNpbWlsYXJcIj48L2Rpdj5gO1xuXG4gIGRvbSgnLmFjdGlvbicpLmFwcGVuZENoaWxkKGFjdGlvbihpZCwgdGl0bGUsIHR5cGUsIHJlcykpO1xuICBldmVudChyZXMpO1xuXG4gIC8vRklYTUUgd2l0aCBzdWdnZXN0XG4gIC8vcmVuZGVyKHtcbiAgICAvL3VybDogJy9jYXRlZ29yeS8xMz9zaXplPTYnLFxuICAgIC8vdGFyZ2V0OiAnI3NpbWlsYXInLFxuICAgIC8va2xhc3M6IFsnYm94JywgJ25vcm1hbCddLFxuICAgIC8vdGl0bGU6IF8oJ2ZyYWdtZW50X3RpdGxlX3JlY29tbWVuZCcpLFxuICAgIC8vZXh0cmE6ICh4KT0+IGA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke3gubmFtZSB8fCB4LmFydGlzdF9uYW1lfTwvZGl2PmBcbiAgLy99KS50aGVuKGxhenlfaW1hZ2UpO1xuXG59XG5cbmZ1bmN0aW9uIG91dHB1dChfaWQpIHtcbiAgaWQgPSBfaWQ7XG5cbiAgaWYgKHBsYXlsaXN0LnR5cGUubm9ybWFsID09PSB0eXBlKSB7XG4gICAgbWl1aS5wbGF5bGlzdC50cmFjayhpZCwgKHJlcyk9PiB7XG4gICAgICBtaXVpLnBsYXlsaXN0Lm1pbmUoW2lkXSwgKGQpPT4ge1xuICAgICAgICByZXMubmFtZSA9IGQubGlzdFswXS5uYW1lO1xuICAgICAgICBfcmVuZGVyKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChwbGF5bGlzdC50eXBlLmFydGlzdCA9PT0gdHlwZSkge1xuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGAvYXJ0aXN0LyR7aWR9YCxcbiAgICAgIGAvYXJ0aXN0LyR7aWR9L211c2ljYFxuICAgIF0ubWFwKHJlcXVlc3QpKS50aGVuKChyZXMpPT4ge1xuICAgICAgcmVzWzBdLmxpc3QgPSByZXNbMV0ubGlzdDtcbiAgICAgIF9yZW5kZXIocmVzWzBdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0KGAvZGV0YWlsLyR7aWR9P3NpemU9MGApLnRoZW4oX3JlbmRlcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0O1xuIiwiaW1wb3J0IHtfLCBlc2NhcGUsIGRlYm91bmNlLCBsYXp5X2ltYWdlLCByZW5kZXIsIHJlc2V0fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7cGxheWxpc3R9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL2RvbSc7XG5pbXBvcnQgbWl1aSBmcm9tICcuLi9taXVpJztcbmltcG9ydCB1c2VyaW5mbyBmcm9tICcuL3VzZXJpbmZvJztcblxuXG5sZXQgaW1wbCA9IHtcblxuICBuYXZpZ2F0b3IoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgWydhbGxfdHJhY2tzJywgJ2FsbCddLFxuICAgICAgICBbJ2xvY2FsX211c2ljJywgJ2xvY2FsJ10sXG4gICAgICAgIFsnZmF2b3JpdGVfcGxheWxpc3QnLCAnZmF2b3JpdGUnXSxcbiAgICAgICAgWydhcnRpc3RfdmlldycsICdhcnRpc3QnXVxuICAgICAgXS5tYXAoKGQpPT4ge1xuICAgICAgICAvL2xldCB1cmkgPSAoZFsxXSAhPT0gJ2FydGlzdCcpID8gYGRldGFpbC8ke3BsYXlsaXN0W2RbMV1dfWAgOiBgJHtkWzFdfS9mYXZvcml0ZWA7XG4gICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJpdGVtXCIgaHJlZj1cIiR7ZFsxXX1fbXVzaWNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke18oZFswXSl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIiBpZD1cImpzX2NvdW50XyR7ZFsxXX1cIj48L2Rpdj5cbiAgICAgICAgPC9hPmA7XG4gICAgICB9KS5qb2luKCcnKTtcbiAgfSxcblxuICBwbGF5bGlzdCgpIHtcbiAgICBtaXVpLnBsYXlsaXN0Lm1pbmUobnVsbCwgKHJlcyk9PiB7XG4gICAgICByZXNldCgnI21pbmUnLCBmYWxzZSkuYXBwZW5kQ2hpbGQocmVuZGVyKHtcbiAgICAgICAga2xhc3M6IFsnYm94JywgJ3NpbmdsZSddLFxuICAgICAgICB0aXRsZTogXygnbXlfcGxheWxpc3QnKSxcbiAgICAgICAgZXh0cmE6ICh4KT0+IGA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke2VzY2FwZSh4Lm5hbWUpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjXCI+JHtfKCdOdHJhY2tzX2NvdW50JywgeC5tZW1iZXJfY291bnQpfTwvZGl2PmBcbiAgICAgIH0sIHJlcykpO1xuICAgICAgbGF6eV9pbWFnZSgpO1xuICAgICAgLy9GSVhNRVxuICAgICAgZG9tLmFsbCgnI21pbmUgLml0ZW0nKS5mb3JFYWNoKChlbCk9PiB7XG4gICAgICAgIGRvbS5wcmVzcyhlbCwgKCk9PiB7XG4gICAgICAgICAgLy9sZXQgciA9IG1pdWkucGxheWxpc3QucmVtb3ZlKFtlbC5kYXRhc2V0LmlkXSwgdHJ1ZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZWwsICdvbiBwcmVzczonKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBjb3VudCgpIHtcbiAgICBPYmplY3Qua2V5cyhtaXVpLmNvdW50KS5mb3JFYWNoKChrKT0+IHtcbiAgICAgIG1pdWkuY291bnRba10oKHJlcyk9PiB7XG4gICAgICAgIC8vdHJ5IHNoYWRvdyBkb20/XG4gICAgICAgIGRvbShgI2pzX2NvdW50XyR7a31gKS50ZXh0Q29udGVudCA9IF8oJ050cmFja3NfY291bnQnLCByZXMuY291bnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmxldCBvbl9jaGFuZ2UgPSBkZWJvdW5jZSgoKT0+IHtcbiAgaW1wbC5jb3VudCgpO1xuICBpbXBsLnBsYXlsaXN0KCk7XG59LCA1MDApO1xuXG5mdW5jdGlvbiBvdXRwdXQoKSB7XG4gIHJlc2V0KCcjYXBwJykuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgaWQ9XCJ1c2VyaW5mb1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJib3ggbmF2aWdhdG9yIGxvY2FsXCI+XG4gICAgICA8bmF2PiR7aW1wbC5uYXZpZ2F0b3IoKX08L25hdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPVwic3VnZ2VzdFwiPjwvZGl2PlxuICAgIDxkaXYgaWQ9XCJtaW5lXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNyZWF0ZVwiPjxpbWcgc3JjPVwiaW1nL2xvY2FsX3BsdXMucG5nXCIgLz4ke18oJ2NyZWF0ZV9wbGF5bGlzdCcpfTwvZGl2PmA7XG5cbiAgZG9tKCcjdXNlcmluZm8nKS5hcHBlbmRDaGlsZCh1c2VyaW5mbygpKTtcblxuICBtaXVpLm1pKCdSZWdpc3RlckRhdGFDYWNoZU9ic2VydmVyJywgJ2NhbGxiYWNrJywge3R5cGU6ICdwbGF5bGlzdHNfbWVtYmVyX2NvdW50J30sIG9uX2NoYW5nZSk7XG4gIG1pdWkubWkoJ1JlZ2lzdGVyRGF0YUNhY2hlT2JzZXJ2ZXInLCAnY2FsbGJhY2snLCB7dHlwZTogJ3BsYXlsaXN0X2Zhdm9yaXRlX2NvdW50J30sIG9uX2NoYW5nZSk7XG4gIG1pdWkubWkoJ1JlZ2lzdGVyVXJpT2JzZXJ2ZXInLCAnY2FsbGJhY2snLCB7dXJpOiBwbGF5bGlzdC51cmkucHJpdmF0ZX0sIG9uX2NoYW5nZSk7XG5cbiAgaW1wbC5jb3VudCgpO1xuICBpbXBsLnBsYXlsaXN0KCk7XG5cbiAgcmVuZGVyKHtcbiAgICB1cmw6ICcvY2F0ZWdvcnkvNz9zaXplPTInLFxuICAgIHRhcmdldDogJyNzdWdnZXN0JyxcbiAgICBrbGFzczogWydib3gnLCAnc2luZ2xlJ10sXG4gICAgdGl0bGU6IF8oJ3N1Z2dlc3RfdGV4dCcpLFxuICAgIGV4dHJhOiAoeCk9PiBgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHt4Lm5hbWV9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY1wiPiR7eC5kZXNjcmlwdGlvbn08L2Rpdj5gXG4gIH0pLnRoZW4obGF6eV9pbWFnZSk7XG5cbiAgZG9tKCcuY3JlYXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZSgoKT0+IHtcbiAgICBtaXVpLnBsYXlsaXN0LmNyZWF0ZSgocmVzKT0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAvL2ltcGwudXBkYXRlLnBsYXlsaXN0KCk7XG4gICAgfSk7XG4gIH0pLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG91dHB1dDtcbiIsImltcG9ydCB7XywgbGF6eV9pbWFnZSwgcmVxdWVzdCwgcmVuZGVyLCByZXNldH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2RlZmF1bHRfY292ZXIsIHBsYXlsaXN0fSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9kb20nO1xuaW1wb3J0IGJhbm5lciBmcm9tICcuL2Jhbm5lcic7XG5pbXBvcnQgbWl1aSBmcm9tICcuLi9taXVpJztcblxuXG5mdW5jdGlvbiBuYXYodGFyZ2V0KSB7XG4gIGxldCBlbmFibGVfaGVhZGVyID0gKHRhcmdldCA9PT0gJyNoZWFkZXInKTtcbiAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbmF2aWdhdG9yJywgJ29ubGluZScpO1xuICBpZiAoZW5hYmxlX2hlYWRlcikge1xuICAgIHdyYXAuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIvc2VhcmNoXCIgY2xhc3M9XCJzZWFyY2hcIj4ke18oJ3NlYXJjaF9oaW50Jyl9PC9hPmA7XG4gICAgYmFubmVyKHdyYXApO1xuICB9XG4gIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICBlbC5pbm5lckhUTUwgPSBbXG4gICAgWydyZWNvbW1lbmQnLCAnL21vcmUvY2F0ZWdvcnkvMTA/c2l6ZT0wJ10sXG4gICAgWydhcnRpc3QnLCAnL2FydGlzdCddLFxuICAgIFsnYmlsbCcsICcvbW9yZS9jYXRlZ29yeS83P3NpemU9MCddLFxuICAgIFsnY2hhbm5lbCcsICcvbW9yZS9jYXRlZ29yeS8xMj9zaXplPTAnXVxuICBdLm1hcCgoZCkgPT4gYDxhIGhyZWY9XCIke2RbMV19XCI+JHtfKCdmcmFnbWVudF90aXRsZV8nICsgZFswXSl9PC9hPmApLmpvaW4oJycpO1xuICB3cmFwLmFwcGVuZENoaWxkKGVsKTtcbiAgZG9tKHRhcmdldCkuYXBwZW5kQ2hpbGQod3JhcCk7XG59XG5cbmZ1bmN0aW9uIG91dHB1dCgpIHtcbiAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcC5pbm5lckhUTUwgPSBbJ2hlYWRlcicsICdyZWNvbW1lbmQnLCAncmFuZG9tJywgJ2JpbGxib2FyZCcsICdhbGJ1bScsICdob3Rfc29uZycsICdmbScsICdhcnRpc3QnLCAnZm9vdGVyJ11cbiAgICAubWFwKChpZCk9PiBgPGRpdiBpZD1cIiR7aWR9XCI+PC9kaXY+YClcbiAgICAuam9pbignJyk7XG4gIHJlc2V0KCcjYXBwJykuYXBwZW5kQ2hpbGQod3JhcCk7XG4gIFsnI2hlYWRlcicsICcjZm9vdGVyJ10ubWFwKG5hdik7XG5cbiAgbGV0IHN1Z2dlc3QgPSBtaXVpLnJlcXVlc3Qoe1xuICAgIHVybDogJ2h0dHA6Ly9tdXNpYy5zZWFyY2gueGlhb21pLm5ldC9yZWNvbW1lbmQvdjYuMS9zc28vcGVyc29uYWxsaXN0JyxcbiAgICBzY2hlbWU6ICdzc28nLFxuICAgIG1ldGhvZDogJ2dldCcsXG4gICAgYm9keTogJ3tjb3VudDozfScsXG4gICAgc2VydmljZUlkOiAnbWl1aW11c2ljX3NlYXJjaCdcbiAgfSk7XG4gIGNvbnNvbGUubG9nKCdwZXJzb25hbCBsaXN0IDonICsgc3VnZ2VzdCk7XG4gIGNvbnNvbGUubG9nKHJlbmRlcih7XG4gICAgdGFyZ2V0OiAnI3JhbmRvbScsXG4gICAgdHlwZTogcGxheWxpc3QudHlwZS5iaWxsYm9hcmQsXG4gICAga2xhc3M6IFsnYm94JywgJ3NpbmdsZSddLFxuICAgIHRpdGxlOiBfKCdzdWdnZXN0X3RleHQnKSxcbiAgICBtb3JlOiB7XG4gICAgICB0aXRsZTogXygnbW9yZV9zdWdnZXN0JyksXG4gICAgICBocmVmOiAnL21vcmUvY2F0ZWdvcnkvNz9zaXplPTAnXG4gICAgfSxcbiAgICBleHRyYTogKHgpPT4gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7eC5uYW1lfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4ke3guZGVzY3JpcHRpb259PC9kaXY+YFxuICB9LCBKU09OLnBhcnNlKHN1Z2dlc3QpKSk7XG5cbiAgbGV0IHRhc2sgPSBbe1xuICAgIHVybDogJy9jYXRlZ29yeS9tb2JpbGUvcmVjb21tZW5kP3NpemU9NicsXG4gICAgdGFyZ2V0OiAnI3JlY29tbWVuZCcsXG4gICAgdHlwZTogcGxheWxpc3QudHlwZS5yZWNvbW1lbmQsXG4gICAga2xhc3M6IFsnYm94JywgJ25vcm1hbCddLFxuICAgIHRpdGxlOiBfKCdmcmFnbWVudF90aXRsZV9yZWNvbW1lbmQnKSxcbiAgICBtb3JlOiB7XG4gICAgICB0aXRsZTogXygnbW9yZV9yZWNvbW1lbmQnKSxcbiAgICAgIGhyZWY6ICcvbW9yZS9jYXRlZ29yeS9tb2JpbGUvcmVjb21tZW5kP3NpemU9MCdcbiAgICB9LFxuICAgIGV4dHJhOiAoeCk9PiBgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHt4Lm5hbWV9PC9kaXY+YFxuICB9LCB7XG4gICAgdXJsOiAnL2NhdGVnb3J5L21vYmlsZS9uZXdlc3QnLFxuICAgIHRhcmdldDogJyNhbGJ1bScsXG4gICAgdHlwZTogcGxheWxpc3QudHlwZS5hbGJ1bSxcbiAgICBrbGFzczogWydib3gnLCAnbm9ybWFsJ10sXG4gICAgdGl0bGU6IF8oJ2ZyYWdtZW50X3RpdGxlX2FydGlzdF9hbGJ1bScpLFxuICAgIG1vcmU6IHtcbiAgICAgIHRpdGxlOiBfKCdtb3JlX2FsYnVtJyksXG4gICAgICBocmVmOiAnL21vcmUvY2F0ZWdvcnkvbW9iaWxlL25ld2VzdD9zaXplPTAnXG4gICAgfSxcbiAgICBleHRyYTogKHgpPT4gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7eC5uYW1lfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4ke3guYXJ0aXN0fTxlbSBjbGFzcz1cInRhZ1wiPiR7eC5kZXNjcmlwdGlvbn08L2VtPjwvZGl2PmBcbiAgfSwge1xuICAgIC8vdXJsOiBgY29udGVudDovL2NvbS5taXVpLnBsYXllci5oeWJyaWQvaHR0cC8ke2VuY29kZVVSSUNvbXBvbmVudCgnaHR0cDovL3YyLmZtLmR1b2thbmJveC5jb20vY2F0ZWdvcnkvMTI/c2l6ZT00Jyl9YCxcbiAgICB1cmw6ICcvY2F0ZWdvcnkvbW9iaWxlL2ZtP3NpemU9NCcsXG4gICAgdGFyZ2V0OiAnI2ZtJyxcbiAgICB0eXBlOiBwbGF5bGlzdC50eXBlLmZtLFxuICAgIGtsYXNzOiBbJ2JveCcsICdzaW5nbGUnXSxcbiAgICB0aXRsZTogXygnZnJhZ21lbnRfdGl0bGVfY2hhbm5lbCcpLFxuICAgIG1vcmU6IHtcbiAgICAgIHRpdGxlOiBfKCdtb3JlX2ZtJyksXG4gICAgICBocmVmOiAnL21vcmUvY2F0ZWdvcnkvbW9iaWxlL2ZtP3NpemU9MCdcbiAgICB9LFxuICAgIGV4dHJhOiAoeCk9PiBgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHt4Lm5hbWV9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY1wiPiR7eC5kZXNjcmlwdGlvbn08L2Rpdj5gXG4gIH0sIHtcbiAgICB1cmw6ICdodHRwOi8vbXVzaWMuc2VhcmNoLnhpYW9taS5uZXQvcmVjb21tZW5kL3Y2LjEvaG9tZWFydGlzdHM/c2l6ZT00JyxcbiAgICB0YXJnZXQ6ICcjYXJ0aXN0JyxcbiAgICB0eXBlOiBwbGF5bGlzdC50eXBlLmFydGlzdCxcbiAgICBrbGFzczogWydib3gnLCAnc2luZ2xlJ10sXG4gICAgdGl0bGU6IF8oJ2ZyYWdtZW50X3RpdGxlX2FydGlzdCcpLFxuICAgIG1vcmU6IHtcbiAgICAgIHRpdGxlOiBfKCdtb3JlX2FydGlzdCcpLFxuICAgICAgaHJlZjogJy9hcnRpc3QnXG4gICAgfSxcbiAgICBleHRyYTogKHgpPT4gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7eC5hcnRpc3RfbmFtZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjXCI+JHt4LmludHJvZHVjZX08L2Rpdj5gXG4gIH1dLm1hcChyZW5kZXIpO1xuXG4gIC8vVE9ETyBkb3dubG9hZFxuICAvL2NvbnNvbGUubG9nKG1pdWkucmVxdWVzdCh7dXJsOidodHRwOi8vdjIuZm0uZHVva2FuYm94LmNvbS9jaGFubmVsL25ld2VzdCcsIHNjaGVtZTogJ2h0dHAnfSkpO1xuICAvL3JlcXVlc3QoJy9kZXRhaWwvMTMwJykudGhlbigoZGF0YSk9PiB7XG4gIHRhc2sucHVzaChyZXF1ZXN0KCcvZGV0YWlsL25ld2VzdCcpLnRoZW4oKHJlcyk9PiB7XG4gICAgaWYgKCFyZXMubGlzdCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1tlbXB0eSBsaXN0XTogJyArIHJlcy5yZWZfdXJsKTtcbiAgICB9XG4gICAgbGV0IGhvdF9zb25nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG90X3NvbmcuY2xhc3NMaXN0LmFkZCgnYm94JywgJ3NpbmdsZScpO1xuICAgIGhvdF9zb25nLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiaGRcIj4ke18oJ3RyYWNrX21haW5fZnJhZ21lbnRfdGFiX3RyYWNrJyl9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYmRcIj4ke3Jlcy5saXN0Lm1hcCgoeCwgaSk9PiB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIml0ZW0gc29uZ1wiIGRhdGEtaWR4PVwiJHtpfVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj48aW1nIGNsYXNzPVwiY292ZXIgbGF6eVwiIHNyYz1cIiR7ZGVmYXVsdF9jb3Zlci5hbGJ1bX1cIiBkYXRhLXNyYz1cIiR7eC5jb3Zlcl91cmx9XCIgLz48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke3gubmFtZX08c3BhbiBjbGFzcz1cImhxXCI+SFE8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY1wiPiR7eC5hcnRpc3RfbmFtZX0gfCAke3guYWxidW1fbmFtZX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+PGkgY2xhc3M9XCJpY29uIGljb24tZG93bmxvYWRcIj48L2k+PC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICB9KS5qb2luKCcnKX08L2Rpdj5cbiAgICAgIDxhIGNsYXNzPVwiZnQgbW9yZVwiIGhyZWY9XCIvbW9yZVwiPiR7XygnbW9yZV9zb25nJyl9PC9hPmA7XG4gICAgZG9tKCcjaG90X3NvbmcnKS5hcHBlbmRDaGlsZChob3Rfc29uZyk7XG4gICAgZG9tLmFsbCgnLnNvbmcnLCBob3Rfc29uZykuZm9yRWFjaCgoZWwpPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICAgIG1pdWkucGxheWJhY2sobnVsbCwgcGxheWxpc3QudHlwZS5ob3Rfc29uZywgXygndHJhY2tfbWFpbl9mcmFnbWVudF90YWJfdHJhY2snKSwgcmVzLmxpc3QsIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkeCk7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBQcm9taXNlLmFsbChbXG4gICAgJ2h0dHA6Ly9tdXNpYy5zZWFyY2gueGlhb21pLm5ldC9yZWNvbW1lbmQvdjYuMS9uZXdzb25ncmFuaz9jb3VudD0zJyxcbiAgICAnaHR0cDovL211c2ljLnNlYXJjaC54aWFvbWkubmV0L3JlY29tbWVuZC92Ni4xL3RvcHNvbmdyYW5rP2NvdW50PTMnLFxuICAgICdodHRwOi8vbXVzaWMuc2VhcmNoLnhpYW9taS5uZXQvcmVjb21tZW5kL3Y2LjEvcmlzZXNvbmdyYW5rP2NvdW50PTMnXG4gIF0ubWFwKHJlcXVlc3QpKS50aGVuKChsaXN0KT0+IHtcbiAgICByZW5kZXIoe1xuICAgICAgdGFyZ2V0OiAnI2JpbGxib2FyZCcsXG4gICAgICB0eXBlOiBwbGF5bGlzdC50eXBlLmJpbGxib2FyZCxcbiAgICAgIGtsYXNzOiBbJ2JveCcsICdzaW5nbGUnXSxcbiAgICAgIHRpdGxlOiBfKCdmcmFnbWVudF90aXRsZV9iaWxsJyksXG4gICAgICBtb3JlOiB7XG4gICAgICAgIHRpdGxlOiBfKCdtb3JlX2JpbGxib2FyZCcpLFxuICAgICAgICBocmVmOiAnL21vcmUvY2F0ZWdvcnkvbW9iaWxlL2xpc3Q/c2l6ZT0wJ1xuICAgICAgfSxcbiAgICAgIGV4dHJhOiAoeCk9PiBgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHt4Lm5hbWV9PC9kaXY+XG4gICAgICAgIDx1bCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAke3gubGlzdC5tYXAoKGQsIGkpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGA8bGk+JHtpICsgMX0gJHtkLm5hbWV9IC0gJHtkLmFydGlzdF9uYW1lfTwvbGk+YDtcbiAgICAgICAgICB9KS5qb2luKCcnKX1cbiAgICAgICAgPC91bD5gXG4gICAgfSwge2xpc3R9KTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5hbGwodGFzaykudGhlbihsYXp5X2ltYWdlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0O1xuIiwiaW1wb3J0IHtfLCBlc2NhcGUsIGxhenlfaW1hZ2UsIHJlc2V0LCByZXF1ZXN0LCByZW5kZXIsIHNwbGFzaH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge2RlZmF1bHRfY292ZXIsIHBsYXlsaXN0fSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9kb20nO1xuaW1wb3J0IG1pdWkgZnJvbSAnLi4vbWl1aSc7XG5cblxuZnVuY3Rpb24gdGFnKCkge1xuICByZXF1ZXN0KCdodHRwOi8vbXVzaWMuc2VhcmNoLnhpYW9taS5uZXQvdjYxL3RvcFF1ZXJpZXM/Y291bnQ9MTUnKS50aGVuKChyZXMpPT4ge1xuICAgIGRvbSgnLmhvdF90YWcgLmJkJykuaW5uZXJIVE1MID0gcmVzLnJlc3VsdC5tYXAoKHtuYW1lfSk9PiBgPHNwYW4gY2xhc3M9XCJxdWVyeVwiPiR7bmFtZX08L3NwYW4+YCkuam9pbignJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaXN0b3J5KCkge1xuICBsZXQgcmVzID0gbWl1aS5zZWFyY2guaGlzdG9yeSgpO1xuICBkb20oJy5oaXN0b3J5IC5iZCcpLmlubmVySFRNTCA9IHJlcy5jb250ZW50Lmxpc3QubWFwKChuYW1lKT0+IGA8ZGl2IGNsYXNzPVwicXVlcnlcIj4ke2VzY2FwZShkZWNvZGVVUklDb21wb25lbnQobmFtZSkpfTwvZGl2PmApLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBzZWFyY2gocXVlcnksIHQ9J2luc3RhbnQnKSB7XG4gIGlmICghcXVlcnkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF+WydpbnN0YW50JywgJ3NlYXJjaCcsICdzdWdnZXN0J10uaW5kZXhPZih0KSkge1xuICAgIHQgPSAnaW5zdGFudCc7XG4gIH1cbiAgc3BsYXNoKCcjYXBwJyk7XG4gIHJlcXVlc3QoJ2h0dHA6Ly9tdXNpYy5zZWFyY2gueGlhb21pLm5ldC92NjEvJHt0fT9xPScgKyBxdWVyeSlcbiAgICAudGhlbigocmVzKT0+IHtcbiAgICAgIHJldHVybiByZXMubGlzdC5yZWR1Y2UoKHJldCwgZCk9PiB7XG4gICAgICAgIHJldFtkLnR5cGVdID0gcmV0W2QudHlwZV0gfHwgW107XG4gICAgICAgIHJldFtkLnR5cGVdLnB1c2goZCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LCB7fSk7XG4gICAgfSkudGhlbigoZ3JvdXApPT4ge1xuICAgICAgcmVzZXQoJyNhcHAnKTtcbiAgICAgIFsnYXJ0aXN0JywgJ2FsYnVtJ10ubWFwKCh0eXBlKT0+IHtcbiAgICAgICAgaWYgKCFncm91cFt0eXBlXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkb20oJyNhcHAnKS5hcHBlbmRDaGlsZChyZW5kZXIoe1xuICAgICAgICAgIHRpdGxlOiBfKHR5cGUpLFxuICAgICAgICAgIHR5cGU6IHBsYXlsaXN0LnR5cGVbdHlwZV0sXG4gICAgICAgICAga2xhc3M6IFsnYm94JywgJ3NpbmdsZScsICdyZXN1bHQnXSxcbiAgICAgICAgICBleHRyYTogKHgpPT4ge1xuICAgICAgICAgICAgbGV0IHJldCA9IGA8ZGl2IGNsYXNzPVwidGl0bGVcIj4ke3gubmFtZSB8fCB4LmFydGlzdF9uYW1lfTwvZGl2PmA7XG4gICAgICAgICAgICBpZiAodHlwZSAhPT0gJ2FydGlzdCcpIHtcbiAgICAgICAgICAgICAgcmV0ICs9IGA8ZGl2IGNsYXNzPVwiZGVzY1wiPiR7eC5hcnRpc3RfbmFtZSB8fCAnJ308L2Rpdj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtsaXN0OiBncm91cFt0eXBlXX0pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGdyb3VwLnNvbmc7XG4gICAgfSkudGhlbigobGlzdCk9PiB7XG4gICAgICBsZXQgc29uZ19saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzb25nX2xpc3QuY2xhc3NMaXN0LmFkZCgnYm94JywgJ3NpbmdsZScsICdyZXN1bHQnKTtcbiAgICAgIHNvbmdfbGlzdC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImhkXCI+JHtfKCdzb25nJyl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZFwiPiR7bGlzdC5tYXAoKHgsIGlkeCk9PiB7XG4gICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiaXRlbSBzb25nXCIgZGF0YS1pZHg9XCIke2lkeH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj48aW1nIGNsYXNzPVwiY292ZXIgbGF6eVwiIHNyYz1cIiR7ZGVmYXVsdF9jb3Zlci5hbGJ1bX1cIiBkYXRhLXNyYz1cIiR7eC5jb3Zlcl91cmx9XCIgLz48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+JHt4Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjXCI+JHt4LmFydGlzdF9uYW1lfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfSkuam9pbignJyl9PC9kaXY+YDtcbiAgICAgIGRvbSgnI2FwcCcpLmFwcGVuZENoaWxkKHNvbmdfbGlzdCk7XG4gICAgICBkb20uYWxsKCcuc29uZycsIHNvbmdfbGlzdCkuZm9yRWFjaCgoZWwpPT4ge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgICAgICBtaXVpLnBsYXliYWNrKG51bGwsIHBsYXlsaXN0LnR5cGVbdF0sIHF1ZXJ5LCBsaXN0LCBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZHgpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KS50aGVuKGxhenlfaW1hZ2UpO1xufVxuXG5mdW5jdGlvbiBldmVudCgpIHtcbiAgZG9tKCcjYXBwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgbGV0IGVsID0gZS50YXJnZXQ7XG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncXVlcnknKSkge1xuICAgICAgbGV0IGRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoZWwudGV4dENvbnRlbnQudHJpbSgpKTtcbiAgICAgIG1pdWkuc2VhcmNoLmhpc3Rvcnkoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0eXBlOiAnYWRkJ1xuICAgICAgfSk7XG4gICAgICBzZWFyY2goZGF0YSwgJ3N1Z2dlc3QnKTtcbiAgICB9XG4gIH0sIGZhbHNlKTtcbn1cblxuLy9GSVhNRSB3aXRoIGRlYm91bmNlXG5mdW5jdGlvbiBvbl9jaGFuZ2UocmVzKSB7XG4gIC8vY29uc29sZS5sb2cocmVzKTtcbiAgbGV0IGFyZ3MgPSBbcmVzLmRhdGEudGV4dF07XG4gIGlmIChyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICBtaXVpLnNlYXJjaC5oaXN0b3J5KHtcbiAgICAgIGRhdGE6IHJlcy5kYXRhLnRleHQsXG4gICAgICB0eXBlOiAnYWRkJ1xuICAgIH0pO1xuICAgIGFyZ3MucHVzaCgnc2VhcmNoJyk7XG4gIH1cbiAgc2VhcmNoKC4uLmFyZ3MpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgbWl1aS5taSgnUmVnaXN0ZXJTZWFyY2hJbnB1dCcsICdzeW5jJywgbnVsbCwgb25fY2hhbmdlKTtcbn1cblxuZnVuY3Rpb24gb3V0cHV0KCkge1xuICByZXNldCgnI2FwcCcpLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiYm94IG5hdmlnYXRvciBzZWFyY2hcIiBoaWRlPlxuICAgICAgPGEgaHJlZj1cIlwiPl8oJ2FsbF9hcnRpc3QnKTwvYT5cbiAgICAgIDxhIGhyZWY9XCJcIj5fKCflkKzmrYzor5Xmm7InKTwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYm94IGhvdF90YWdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZFwiPiR7Xygnc2VhcmNoX3RpdGxlJyl9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYmRcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICBjbGFzcz1cImJveCBoaXN0b3J5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGRcIj4ke18oJ2hpc3RvcnknKX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJiZFwiPjwvZGl2PlxuICAgIDwvZGl2PmA7XG5cbiAgcmVnaXN0ZXIoKTtcbiAgdGFnKCk7XG4gIGhpc3RvcnkoKTtcbiAgZXZlbnQoKTtcbiAgLy9zZWFyY2goJ+Wwj+awtOaenCcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdXRwdXQ7XG4iLCJpbXBvcnQge199IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtkZWZhdWx0X2NvdmVyfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IG1pdWkgZnJvbSAnLi4vbWl1aSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL2RvbSc7XG5cblxubGV0IHVzZXI7XG5sZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IGtleSA9IFsndXNlck5hbWUnLCAndXNlckF2YXRhclVybCcsICd1c2VySWQnXTtcblxuZnVuY3Rpb24gYmluZChuYW1lKSB7XG4gIHJldHVybiBgYmlkPVwianNfdXNlcmluZm9fJHtuYW1lfVwiYDtcbn1cblxuZnVuY3Rpb24gZmV0Y2goKSB7XG4gIG1pdWkubWkoJ1F1ZXJ5VXNlckluZm8nLCAnY2FsbGFiY2snLCBudWxsLCAocmVzKT0+IHtcbiAgICB1c2VyID0gcmVzO1xuICAgIGtleS5mb3JFYWNoKChrKT0+IHtcbiAgICAgIGxldCBkZWYgPSAoayA9PT0ga2V5WzBdKSA/IF8oJ25vdF9sb2dpbicpIDogJyc7XG4gICAgICBkb20udXBkYXRlKGBbJHtiaW5kKGspfV1gLCAocmVzW2tdIHx8IGRlZiksIG5vZGUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gIG1pdWkubWkoJ1JlZ2lzdGVyQnJvYWRjYXN0UmVjZWl2ZXInLCAnY2FsbGJhY2snLCAnYW5kcm9pZC5hY2NvdW50cy5MT0dJTl9BQ0NPVU5UU19QUkVfQ0hBTkdFRCcsIGZldGNoKTtcbn1cblxuZnVuY3Rpb24gZXZlbnQoKSB7XG4gIC8vIOacgOWQjuS4gOagj+eCueWHu+ebtOaOpei3syBzZXR0aW5nc1xuICBkb20uYWxsKCcucm93Jywgbm9kZSkuc2xpY2UoMCwgLTEpLmZvckVhY2goKGQpPT4ge1xuICAgIGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICAgIGlmICh1c2VyLnVzZXJJZCkge1xuICAgICAgICBtaXVpLm1pKCdIYW5kbGVVcmknLCAnc3luYycsIGBtaXVpLW11c2ljOi8vc2V0dGluZ3M/YW5pbT1zbGlkZWAsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWl1aS5taSgnTG9naW5BY2NvdW50JywgJ2NhbGxiYWNrJywgbnVsbCwgZmV0Y2gpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgbm9kZS5jbGFzc0xpc3QuYWRkKCdib3gnLCAndXNlcl9pbmZvJyk7XG4gIG5vZGUuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJyb3dcIj48aW1nIGNsYXNzPVwiY292ZXIgYXZhdGFyXCIgc3JjPVwiJHtkZWZhdWx0X2NvdmVyLmF2YXRhcn1cIiAke2JpbmQoJ3VzZXJBdmF0YXJVcmwnKX0gLz48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiAke2JpbmQoJ3VzZXJOYW1lJyl9PiR7Xygnbm90X2xvZ2luJyl9PHNwYW4gY2xhc3M9XCJocVwiICR7YmluZCgnbGV2ZWwnKX0gaGlkZT48L3NwYW4+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY1wiICR7YmluZCgndGl0bGUnKX0+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPjxhIGhyZWY9XCJzZXR0aW5nc1wiPiR7XygncHJlc29uYWxfY2VudGVyJyl9PC9hPjwvZGl2PmA7XG5cbiAgcmVnaXN0ZXIoKTtcbiAgZXZlbnQoKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcbiJdfQ==
