import {_, lazy_image, reset, render} from '../util';
import {default_cover, playlist} from '../config';


function output() {
  let node = document.createElement('div');
  node.innerHTML = `<div class="box single">
    ${['男歌手', '女歌手', '团体'].map((k)=> {
      return `<div class="item">
        <div class="row"><img src="${default_cover.artist}" class="cover artist" /></div>
        <div class="row">
          <div class="title">${k}</div>
          <div class="desc">FIXME number </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
  render({
    url: 'http://music.search.xiaomi.net/recommend/v6.1/homeartists?size=3', //FIXME region
    klass: ['box', 'single'],
    title: _('hot_artist'),
    type: playlist.type.artist,
    extra: (x)=> `<div class="title">${x.artist_name}</div>`
  }).then((el)=> node.appendChild(el)).then(lazy_image);
  reset('#app').appendChild(node);
}

export default output;
