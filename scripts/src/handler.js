import {lazy_image, render, reset, parse_hash_query} from './util';
import dom from './dom';
import page_online from './view/page.online';
import page_local from './view/page.local';
import page_detail from './view/page.detail';
import page_artist from './view/page.artist';
import page_search from './view/page.search';


let proxy = {
  page_local,
  page_online
};

export default {
  home() {
    let t = (parse_hash_query().page !== 'online') ? 'local' : 'online';
    let root = dom('#app');
    root.classList.add(root.className + '_' + t);
    proxy['page_' + t]();
  },

  more(...args) {
    render({
      url: '/' + args.join('/'),
      klass: ['box', 'single'],
      title: 'MORE', //TODO
      extra: (x)=> `<div class="title">${x.name}</div>
        <div class="desc">${x.description}</div>`
    }).then((node)=> {
      reset('#app').appendChild(node);
      lazy_image();
    });
  },

  artist() {
    page_artist();
  },

  detail(id) {
    page_detail(id);
  },

  search() {
    page_search();
  },

  not_found() {
    console.error('404 HANDLER NOT FOUND');
    //redirect to home_local
  }
};
