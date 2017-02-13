import {_, lazy_image, request, render, reset} from '../util';
import {default_cover, playlist} from '../config';
import dom from '../dom';
import banner from './banner';
import miui from '../miui';


function nav(target) {
  let enable_header = (target === '#header');
  let wrap = document.createElement('div');
  wrap.classList.add('box', 'navigator', 'online');
  if (enable_header) {
    wrap.innerHTML = `<a href="/search" class="search">${_('search_hint')}</a>`;
    banner(wrap);
  }
  let el = document.createElement('nav');
  el.innerHTML = [
    ['recommend', '/more/category/10?size=0'],
    ['artist', '/artist'],
    ['bill', '/more/category/7?size=0'],
    ['channel', '/more/category/12?size=0']
  ].map((d) => `<a href="${d[1]}">${_('fragment_title_' + d[0])}</a>`).join('');
  wrap.appendChild(el);
  dom(target).appendChild(wrap);
}

function output() {
  let wrap = document.createElement('div');
  wrap.innerHTML = ['header', 'recommend', 'random', 'billboard', 'album', 'hot_song', 'fm', 'artist', 'footer']
    .map((id)=> `<div id="${id}"></div>`)
    .join('');
  reset('#app').appendChild(wrap);
  ['#header', '#footer'].map(nav);

  let suggest = miui.request({
    url: 'http://music.search.xiaomi.net/recommend/v6.1/sso/personallist',
    scheme: 'sso',
    method: 'get',
    body: '{count:3}',
    serviceId: 'miuimusic_search'
  });
  console.log('personal list :' + suggest);
  console.log(render({
    target: '#random',
    type: playlist.type.billboard,
    klass: ['box', 'single'],
    title: _('suggest_text'),
    more: {
      title: _('more_suggest'),
      href: '/more/category/7?size=0'
    },
    extra: (x)=> `<div class="title">${x.name}</div>
      <div class="desc">${x.description}</div>`
  }, JSON.parse(suggest)));

  let task = [{
    url: '/category/mobile/recommend?size=6',
    target: '#recommend',
    type: playlist.type.recommend,
    klass: ['box', 'normal'],
    title: _('fragment_title_recommend'),
    more: {
      title: _('more_recommend'),
      href: '/more/category/mobile/recommend?size=0'
    },
    extra: (x)=> `<div class="title">${x.name}</div>`
  }, {
    url: '/category/mobile/newest',
    target: '#album',
    type: playlist.type.album,
    klass: ['box', 'normal'],
    title: _('fragment_title_artist_album'),
    more: {
      title: _('more_album'),
      href: '/more/category/mobile/newest?size=0'
    },
    extra: (x)=> `<div class="title">${x.name}</div>
      <div class="desc">${x.artist}<em class="tag">${x.description}</em></div>`
  }, {
    //url: `content://com.miui.player.hybrid/http/${encodeURIComponent('http://v2.fm.duokanbox.com/category/12?size=4')}`,
    url: '/category/mobile/fm?size=4',
    target: '#fm',
    type: playlist.type.fm,
    klass: ['box', 'single'],
    title: _('fragment_title_channel'),
    more: {
      title: _('more_fm'),
      href: '/more/category/mobile/fm?size=0'
    },
    extra: (x)=> `<div class="title">${x.name}</div>
      <div class="desc">${x.description}</div>`
  }, {
    url: 'http://music.search.xiaomi.net/recommend/v6.1/homeartists?size=4',
    target: '#artist',
    type: playlist.type.artist,
    klass: ['box', 'single'],
    title: _('fragment_title_artist'),
    more: {
      title: _('more_artist'),
      href: '/artist'
    },
    extra: (x)=> `<div class="title">${x.artist_name}</div>
      <div class="desc">${x.introduce}</div>`
  }].map(render);

  //TODO download
  //console.log(miui.request({url:'http://v2.fm.duokanbox.com/channel/newest', scheme: 'http'}));
  //request('/detail/130').then((data)=> {
  task.push(request('/detail/newest').then((res)=> {
    if (!res.list) {
      return console.error('[empty list]: ' + res.ref_url);
    }
    let hot_song = document.createElement('div');
    hot_song.classList.add('box', 'single');
    hot_song.innerHTML = `<div class="hd">${_('track_main_fragment_tab_track')}</div>
      <div class="bd">${res.list.map((x, i)=> {
        return `<div class="item song" data-idx="${i}">
          <div class="row"><img class="cover lazy" src="${default_cover.album}" data-src="${x.cover_url}" /></div>
          <div class="row">
            <div class="title">${x.name}<span class="hq">HQ</span></div>
            <div class="desc">${x.artist_name} | ${x.album_name}</div>
          </div>
          <div class="row"><i class="icon icon-download"></i></div>
        </div>`;
      }).join('')}</div>
      <a class="ft more" href="/more">${_('more_song')}</a>`;
    dom('#hot_song').appendChild(hot_song);
    dom.all('.song', hot_song).forEach((el)=> {
      el.addEventListener('click', (e)=> {
        miui.playback(null, playlist.type.hot_song, _('track_main_fragment_tab_track'), res.list, e.currentTarget.dataset.idx);
      }, false);
    });
  }));

  Promise.all([
    'http://music.search.xiaomi.net/recommend/v6.1/newsongrank?count=3',
    'http://music.search.xiaomi.net/recommend/v6.1/topsongrank?count=3',
    'http://music.search.xiaomi.net/recommend/v6.1/risesongrank?count=3'
  ].map(request)).then((list)=> {
    render({
      target: '#billboard',
      type: playlist.type.billboard,
      klass: ['box', 'single'],
      title: _('fragment_title_bill'),
      more: {
        title: _('more_billboard'),
        href: '/more/category/mobile/list?size=0'
      },
      extra: (x)=> `<div class="title">${x.name}</div>
        <ul class="desc">
          ${x.list.map((d, i)=> {
            return `<li>${i + 1} ${d.name} - ${d.artist_name}</li>`;
          }).join('')}
        </ul>`
    }, {list});
  });

  Promise.all(task).then(lazy_image);
}

export default output;
