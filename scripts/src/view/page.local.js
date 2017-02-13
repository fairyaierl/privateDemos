import {_, escape, debounce, lazy_image, render, reset} from '../util';
import {playlist} from '../config';
import dom from '../dom';
import miui from '../miui';
import userinfo from './userinfo';


let impl = {

  navigator() {
    return [
        ['all_tracks', 'all'],
        ['local_music', 'local'],
        ['favorite_playlist', 'favorite'],
        ['artist_view', 'artist']
      ].map((d)=> {
        //let uri = (d[1] !== 'artist') ? `detail/${playlist[d[1]]}` : `${d[1]}/favorite`;
        return `<a class="item" href="${d[1]}_music">
          <div class="title">${_(d[0])}</div>
          <div class="desc" id="js_count_${d[1]}"></div>
        </a>`;
      }).join('');
  },

  playlist() {
    miui.playlist.mine(null, (res)=> {
      reset('#mine', false).appendChild(render({
        klass: ['box', 'single'],
        title: _('my_playlist'),
        extra: (x)=> `<div class="title">${escape(x.name)}</div>
          <div class="desc">${_('Ntracks_count', x.member_count)}</div>`
      }, res));
      lazy_image();
      //FIXME
      dom.all('#mine .item').forEach((el)=> {
        dom.press(el, ()=> {
          //let r = miui.playlist.remove([el.dataset.id], true);
          console.log(el, 'on press:');
        });
      });
    });
  },

  count() {
    Object.keys(miui.count).forEach((k)=> {
      miui.count[k]((res)=> {
        //try shadow dom?
        dom(`#js_count_${k}`).textContent = _('Ntracks_count', res.count);
      });
    });
  }
};

let on_change = debounce(()=> {
  impl.count();
  impl.playlist();
}, 500);

function output() {
  reset('#app').innerHTML = `
    <div id="userinfo"></div>
    <div class="box navigator local">
      <nav>${impl.navigator()}</nav>
    </div>
    <div id="suggest"></div>
    <div id="mine"></div>
    <div class="create"><img src="img/local_plus.png" />${_('create_playlist')}</div>`;

  dom('#userinfo').appendChild(userinfo());

  miui.mi('RegisterDataCacheObserver', 'callback', {type: 'playlists_member_count'}, on_change);
  miui.mi('RegisterDataCacheObserver', 'callback', {type: 'playlist_favorite_count'}, on_change);
  miui.mi('RegisterUriObserver', 'callback', {uri: playlist.uri.private}, on_change);

  impl.count();
  impl.playlist();

  render({
    url: '/category/7?size=2',
    target: '#suggest',
    klass: ['box', 'single'],
    title: _('suggest_text'),
    extra: (x)=> `<div class="title">${x.name}</div>
      <div class="desc">${x.description}</div>`
  }).then(lazy_image);

  dom('.create').addEventListener('click', debounce(()=> {
    miui.playlist.create((res)=> {
      console.log(res);
      //impl.update.playlist();
    });
  }), false);
}

export default output;
