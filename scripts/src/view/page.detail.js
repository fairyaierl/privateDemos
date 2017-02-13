import {_, escape, reset, request, parse_hash_query, URLBuilder} from '../util';
import {default_cover, playlist} from '../config';
import dom from '../dom';
import miui from '../miui';
import action from './action';


let id;
let type = parseInt(parse_hash_query().type || 103, 10);

function event(res) {
  //console.log(res);
  let highlight = 'highlight';
  let song_list = dom.all('.playlist .song');
  song_list.forEach((el, idx)=> {
    el.addEventListener('click', ()=> {
      let hl = dom('.playlist .' + highlight);
      if (hl) {
        hl.classList.remove(highlight);
      }
      el.classList.add(highlight);
      miui.playback(id, type, res.name, res.list, idx);
    }, false);
  });
}

function style(str) {
  let node = document.createElement('style');
  node.appendChild(document.createTextNode(str));
  document.head.appendChild(node);
}

function _render(res) {
  //console.log(res);
  let src = res.url || res.avatar_url || '';
  let title = res.name || res.artist_name || '';
  let cover_cls = src ? 'cover lazy' : 'cover';
  //TODO background gradient
  let bg_url = new URLBuilder(`content://com.miui.player.hybrid/http/${encodeURIComponent(src)}`)
    .append({
      type: 'img',
      blurRadius: 25,
      w: 400,
      h: 200
    }).done();
  style(`body { background: 50% 0 / contain url(${bg_url}) no-repeat fixed; }`);
  reset('#app').innerHTML = `<div class="box detail">
    <div class="row">
      <img class="${cover_cls}" src="${default_cover.album}" data-src="${src}" />
    </div>
    <div class="row">
      <div class="title">${escape(title)}</div>
      <div class="desc">${_('Ntracks_count', res.count || res.list.length)}</div>
    </div>
  </div>

  <div class="box action"></div>

  <ol class="box playlist">
    ${res.list.map((song, idx)=> {
      idx++;
      return `<li class="song" data-idx="${idx}">
        <div class="row order">${(idx < 10) ? '0' + idx : idx}</div>
        <div class="row">
          <div class="title">${song.name || song.title}</div>
          <div class="desc">${song.album || song.album_name}</div>
        </div>
      </li>`;
    }).join('')}
  </ol>`;

  //<div id="similar"></div>`;

  dom('.action').appendChild(action(id, title, type, res));
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

  if (playlist.type.normal === type) {
    miui.playlist.track(id, (res)=> {
      miui.playlist.mine([id], (d)=> {
        res.name = d.list[0].name;
        _render(res);
      });
    });
  } else if (playlist.type.artist === type) {
    Promise.all([
      `/artist/${id}`,
      `/artist/${id}/music`
    ].map(request)).then((res)=> {
      res[0].list = res[1].list;
      _render(res[0]);
    });
  } else {
    request(`/detail/${id}?size=0`).then(_render);
  }
}

export default output;
