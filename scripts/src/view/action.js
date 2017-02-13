import {_, URLBuilder} from '../util';
import {playlist} from '../config';
import miui from '../miui';


let node = document.createElement('div');

function event(id, title, type, res) {
  node.addEventListener('click', (e)=> {
    let klass = e.target.classList;
    if (klass.contains('play')) {
      miui.playback(id, type, res.name, res.list);
    } else if (klass.contains('favorite')) {
      let r = miui.playlist.favorite(res);
      //console.log(r);
      if (r.code === 0 && r.content) {
        klass.remove('favorite');
        klass.add('unfavorite');
      }
    } else if (klass.contains('unfavorite')) {
      let r = miui.playlist.remove([id], false);
      //console.log(r);
      if (r.code === 0 && r.content) {
        klass.remove('unfavorite');
        klass.add('favorite');
      }
    } else if (klass.contains('multiple')) {
      miui.open(new URLBuilder('track_multichoice').append({
        id,
        type,
        name: encodeURIComponent(title)
      }).done());
    } else if (klass.contains('add_song')) {
      miui.playlist.add_song();
    }
    //TODO download, share
  }, false);
}

function render(id, title, type, res) {
  //console.log(id, title, type);
  let list = ['download', 'favorite', 'share', 'play', 'multiple'];
  if (playlist.type.normal === type) {
    list[2] = 'unfavorite';
    list[3] = 'add_song';
  }
  let html = list.map((d)=> `<span class="${d}"><i class="icon icon-${d}"></i>${_('action_item_' + d)}</span>`).join('');
  //html += `<a href="/track_multichoice?type=${type}&id=${id}&name=${title}">${_('action_item_multiple')}</a>`;
  node.innerHTML = html;
  event(id, title, type, res);
  return node;
}

export default render;
