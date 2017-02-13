import {request} from '../util';
import {playlist} from '../config';
import dom from '../dom';


function compose(x) {
  let canvas = document.createElement('canvas');
  canvas.width = 1030;
  canvas.height = 580;
  let ctx = canvas.getContext('2d');

  let task = ['bg', 'head', 'text'].map((k)=> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.dataset.type = k;
      let src = x[k + '_url'] + '?w=360&h=50';
      img.onerror = ()=> reject(img);
      img.onload = ()=> resolve(img);
      //img.src = `content://com.miui.player.hybrid/http/${encodeURIComponent(src)}`;
      img.src = src;
    });
  });

  Promise.all(task).then((list)=> {
    list.forEach((img)=> {
      let dy = (img.dataset.type === 'text') ? canvas.height - img.height : 0;
      ctx.drawImage(img, 0, dy, img.width, img.height);
    });
  });

  return canvas;
}

function redirect(url) {
  let type = url.hash ? url.hash.slice(1) : '';
  if (type === 'list') {
    type = 'billboard';
  }
  if (~['recommend', 'billboard', 'fm'].indexOf(type)) {
    let id = url.pathname.split('/').slice(-1);
    return `/detail/${id}?type=${playlist.type[type]}`;
  } else if (type === 'artist') {
    return url.pathname + '?type=' + playlist.type.artist;
  } else {
    //TODO type === browser?
    return `/web?url=${encodeURIComponent(url.href)}`;
  }
}

function render(target) {

  let node = document.createElement('div');
  node.classList.add('banner-wrap');
  node.innerHTML = `<div class="banner"></div><div class="indicator"></div>`;
  target.appendChild(node);

  let current_cls = 'active';
  let banner = dom('.banner', node);
  let indicator = dom('.indicator', node);

  request('/banner').then((res)=> {
    res.list.map((x, i)=> {
      let link = document.createElement('a');
      link.href = redirect(new URL(x.redirect));
      link.classList.add('item');
      if (i === 0) {
        link.classList.add('active');
      }
      link.appendChild(compose(x));
      banner.appendChild(link);
    });
    return res.list.length;
  }).then((len)=> {
    indicator.innerHTML = (new Array(len + 1)).join('<i></i>');
    indicator.querySelector('i').classList.add(current_cls);
    return len;
  }).then(()=> {
    let item_list = banner.querySelectorAll('.item');
    let pos = 0;
    //TODO try requestAnimationFrame and canvas?
    setInterval(()=> {
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

export default render;
