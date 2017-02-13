import {load_image} from './util';

//<https://github.com/steelbrain/dQuery>
//<http://www.ericponto.com/blog/2014/10/05/es6-dom-library/>

function d(q, target=document) {
  return target.querySelector(q);
}

d.all = (q, target=document)=> [].slice.call(target.querySelectorAll(q));

//<https://github.com/madrobby/zepto/blob/master/src/touch.js>
d.press = (el, fn)=> {
  let delay = 750;
  let delta = 30;
  let start;
  let timer;
  function clear(e) {
    let touch = e.touches[0];
    console.log(e.type, touch, start);
    if (timer && touch
        && Math.abs(touch.pageX - start.x) > delta
        && Math.abs(touch.pageY - start.y) > delta) {
      clearTimeout(timer);
    }
  }
  el.addEventListener('touchstart', (e)=> {
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

d.update = (selector, val, target=document)=> {
  let el = d(selector, target);
  if (!el || !val) {
    return;
  }
  let attr = 'textContent';
  if (el.nodeName.toLowerCase() === 'img') {
    el.dataset.src = val;
    el.classList.add('lazy');
    load_image(el);
    return;
  } else if (el.nodeName.toLowerCase() === 'a') {
    attr = 'href';
  }
  if (el[attr] !== val) {
    el[attr] = val;
  }
};

d.remove = (el)=> {
  el.parentNode.removeChild(el);
};

d.shadow = (el)=> {
  return el.createShadowRoot ? el.createShadowRoot() : el.webkitCreateShadowRoot();
};


export default d;
