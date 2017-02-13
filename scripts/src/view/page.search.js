import {_, escape, lazy_image, reset, request, render, splash} from '../util';
import {default_cover, playlist} from '../config';
import dom from '../dom';
import miui from '../miui';


function tag() {
  request('http://music.search.xiaomi.net/v61/topQueries?count=15').then((res)=> {
    dom('.hot_tag .bd').innerHTML = res.result.map(({name})=> `<span class="query">${name}</span>`).join('');
  });
}

function history() {
  let res = miui.search.history();
  dom('.history .bd').innerHTML = res.content.list.map((name)=> `<div class="query">${escape(decodeURIComponent(name))}</div>`).join('');
}

function search(query, t='instant') {
  if (!query) {
    return;
  }
  if (!~['instant', 'search', 'suggest'].indexOf(t)) {
    t = 'instant';
  }
  splash('#app');
  request('http://music.search.xiaomi.net/v61/${t}?q=' + query)
    .then((res)=> {
      return res.list.reduce((ret, d)=> {
        ret[d.type] = ret[d.type] || [];
        ret[d.type].push(d);
        return ret;
      }, {});
    }).then((group)=> {
      reset('#app');
      ['artist', 'album'].map((type)=> {
        if (!group[type]) {
          return;
        }
        dom('#app').appendChild(render({
          title: _(type),
          type: playlist.type[type],
          klass: ['box', 'single', 'result'],
          extra: (x)=> {
            let ret = `<div class="title">${x.name || x.artist_name}</div>`;
            if (type !== 'artist') {
              ret += `<div class="desc">${x.artist_name || ''}</div>`;
            }
            return ret;
          }
        }, {list: group[type]}));
      });
      return group.song;
    }).then((list)=> {
      let song_list = document.createElement('div');
      song_list.classList.add('box', 'single', 'result');
      song_list.innerHTML = `<div class="hd">${_('song')}</div>
        <div class="bd">${list.map((x, idx)=> {
          return `<div class="item song" data-idx="${idx}">
            <div class="row"><img class="cover lazy" src="${default_cover.album}" data-src="${x.cover_url}" /></div>
            <div class="row">
              <div class="title">${x.name}</div>
              <div class="desc">${x.artist_name}</div>
            </div>
          </div>`;
        }).join('')}</div>`;
      dom('#app').appendChild(song_list);
      dom.all('.song', song_list).forEach((el)=> {
        el.addEventListener('click', (e)=> {
          miui.playback(null, playlist.type[t], query, list, e.currentTarget.dataset.idx);
        }, false);
      });
    }).then(lazy_image);
}

function event() {
  dom('#app').addEventListener('click', (e)=> {
    let el = e.target;
    if (el.classList.contains('query')) {
      let data = encodeURIComponent(el.textContent.trim());
      miui.search.history({
        data,
        type: 'add'
      });
      search(data, 'suggest');
    }
  }, false);
}

//FIXME with debounce
function on_change(res) {
  //console.log(res);
  let args = [res.data.text];
  if (res && res.data && res.data.type === 'submit') {
    miui.search.history({
      data: res.data.text,
      type: 'add'
    });
    args.push('search');
  }
  search(...args);
}

function register() {
  miui.mi('RegisterSearchInput', 'sync', null, on_change);
}

function output() {
  reset('#app').innerHTML = `
    <div class="box navigator search" hide>
      <a href="">_('all_artist')</a>
      <a href="">_('听歌试曲')</a>
    </div>
    <div class="box hot_tag">
      <div class="hd">${_('search_title')}</div>
      <div class="bd"></div>
    </div>
    <div  class="box history">
      <div class="hd">${_('history')}</div>
      <div class="bd"></div>
    </div>`;

  register();
  tag();
  history();
  event();
  //search('小水果');
}

export default output;
