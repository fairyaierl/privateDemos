import {default_cover, domain, playlist, scheme_prefix} from './config';
import dom from './dom';


export function _(...args) {
  return window._(...args) || console.error(...args);
}

export function reset(selector, scroll=true) {
  let node = dom(selector);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (scroll) {
    window.scrollTo(0, 0);
  }
  return node;
}

export function splash(target='#app') {
  let loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerHTML = '<img src="img/loading.png" />';
  reset(target).appendChild(loader);
}

export function request(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let _url = url.replace('/detail/', '/channel/');
    if (window.location.protocol !== 'http:'
      && !~url.indexOf('lang')
      && !~url.indexOf('://')) {
        _url = domain.api + _url;
    }
    xhr.open('get', _url);
    xhr.onerror = ()=> reject(xhr.statusText);
    xhr.onload = ()=> {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          res.ref_url = url;
          resolve(res);
        }
      }
    };
    xhr.send();
  });
}

function _render(opt, res) {
  let wrap = document.createElement('div');
  if (opt.klass) {
    wrap.classList.add(...opt.klass);
  }
  let cover_cls = 'cover lazy';
  let cover_src = default_cover.album;
  if (playlist.type.artist === opt.type) {
    cover_cls += ' artist';
    cover_src = default_cover.artist;
  }
  if (opt.target === '#top') {
    res.list = res.list.filter((x)=> x.type === 'song').slice(0, 5);
  }
  let html = res.list.map(x => {
    if (opt.decorate) {
      x = opt.decorate(x);
    }

    let id = x.nid || x._id || x.artist_id || x.sid;
    let type = opt.type || x.list_type;
    let src = x.url || x.avatar_url || x.icon_url || x.cover_url;
    let rows = `<img class="${cover_cls}" src="${cover_src}" data-src="${src}" />${opt.extra(x)}`;
    if (wrap.classList.contains('single')) {
      rows = `<div class="row"><img class="${cover_cls}" src="${cover_src}" data-src="${src}" /></div>
        <div class="row">${opt.extra(x)}</div>`;
    }
    return `<a class="item" href="/detail/${id}?type=${type}" data-id="${id}">${rows}</a>`;
  });

  wrap.innerHTML = (opt.title ? `<div class="hd">${opt.title}</div>` : '') +
    `<div class="bd">${html.join('')}</div>`;

  console.log(wrap);
  if (opt.more) {
    wrap.innerHTML += `<a class="ft more" href="${opt.more.href}">${opt.more.title}</a>`;
  }
  if (opt.target) {
    dom(opt.target).appendChild(wrap);
  }
  return wrap;
}

export function render(opt, res) {
  if (opt.url) {
    return request(opt.url).then((o)=> _render(opt, o));
  } else {
    return _render(opt, res);
  }
}

function load_image_when_visible(el) {
  let rect = el.getBoundingClientRect();
  let visible = (rect.top >= 0
    && rect.left >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
  if (visible) {
    load_image(el);
  } else {
    return true;
  }
}

export function load_image(el) {
  let src = el.dataset.src;
  if (!src || src === 'undefined') {
    el.classList.remove('lazy');
    el.classList.add('loaded', 'empty');
    return;
  }
  let img = new Image();
  img.onload = ()=> {
    el.src = src;
    el.classList.remove('lazy');
    el.classList.add('loaded');
  };
  img.src = src;
}

//<https://gist.github.com/aliem/2171438>
export function lazy_image() {
  let list = dom.all('.lazy');
  function reduce() {
    list = list.filter(load_image_when_visible);
    if (list.length === 0) {
      window.removeEventListener('scroll', reduce, false);
    }
  }
  reduce();
  window.addEventListener('scroll', reduce, false);
}

//<http://codepen.io/32bitkid/blog/understanding-delegated-javascript-events>
//<https://github.com/ccampbell/gator><https://github.com/ftlabs/ftdomdelegate>
export function delegate(criteria, listener) {
  return function(e) {
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
    } while( (el = el.parentNode) );
  };
}

export function parse_hash_url(hash=window.location.hash) {
    //let hash =  test_url || window.location.hash;
    let scheme = `#${scheme_prefix}://`;
    let url = (~hash.indexOf(scheme_prefix) ?
      decodeURIComponent(hash).substr(scheme.length) :
      hash.substr(2));
    //return 'home';
    return url || scheme + 'home';
}

//<https://github.com/sindresorhus/query-string>
export function parse_hash_query(url=parse_hash_url(), def_page='online') {
  //let url = parse_hash_url(hash);
  let str = url.split('?')[1] || '';
  return str.trim().split('&').reduce((ret, param)=> {
    let [k, v] = param.split('=');
    if (v) {
      ret[k] = decodeURIComponent(v);
      if (ret[k].indexOf('{') === 0 || ret[k].indexOf('[') === 0) {
        ret[k] = JSON.parse(ret[k]) || null;
      }
    }
    return ret;
  }, { page: def_page });
}

export class URLBuilder {
  constructor(str) {
    this.url = ~str.indexOf('://') ? str : `miui-music://${str}`;
  }
  replace(...args) {
    this.url = this.url.replace(...args);
    return this;
  }
  append(obj) {
    this.url = Object.keys(obj).reduce((ret, k)=> {
      let pipe = ~ret.indexOf('?') ? '&' : '?';
      ret += pipe + k + '=' + obj[k];
      return ret;
    }, this.url);
    return this;
  }
  done() {
    return this.url;
  }
}

export function escape(str) {
  // 考虑重用
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function debounce(fn, delay, immediate) {
  let timer = null;
  return (...args)=> {
    clearTimeout(timer);
    timer = setTimeout(()=> {
      fn(...args);
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
