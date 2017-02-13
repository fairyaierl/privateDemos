import {delegate, parse_hash_url, request, splash} from './util';
import {locale_list} from './config';
import handler from './handler';
import miui from './miui';
import dom from './dom';

let impl = {
  root: dom('#app'),
  dispatch() {
    splash();
    let args = parse_hash_url().split('?')[0].split('/');
    impl.root.className = args.reduce((ret, arg, idx)=> {
      ret.push('page_' + args.slice(0, idx + 1).join('_'));
      return ret;
    }, []).join(' ');
    (()=> handler[args[0]] || handler.not_found)()(...args.slice(1));
  },
  load() {
    impl.dispatch();
    impl.anchor();
  },
  anchor() {
    impl.root.addEventListener('click',
      delegate((el)=> {
        return el.nodeName.toLowerCase() === 'a';
      }, miui.open), false);
  },
  get_locale_url(lang=window.navigator.language.toLowerCase()) {
    //let _lang = "zh-cn";
    let filtered = locale_list.filter( (d)=> ~lang.indexOf(d) )[0] || 'en';
    return `lang/lang.${filtered}.js`;
  },
  update_lang(res) {
    window._ = (k, v)=> {
      let obj = res[k];
      if (!obj) {
        console.error(`locale key "${k}" not found`);
        return k;
      }
      let ret = '';
      if (typeof obj === 'string') {
        ret = res[k];
      } else {
        let key = (parseInt(v, 10) === 1 && obj.one) ? 'one' : 'other';
        ret = obj[key].replace('${v}', v);
      }
      //console.log(ret, ret[0] + ret[ret.length - 1]);
      return (ret[0] + ret[ret.length - 1] === '""') ? ret.slice(1, -1) : ret;
    };
  }
};

export default {
  notify() {
    window.addEventListener('msg', (e)=> {
      let msg = JSON.parse(e.body);
      console.log('on notify: ', msg, location.href);
    });
    window.notify = (json_str)=> {
      let ev = document.createEvent('HTMLEvents');
      ev.initEvent('msg', true, true);
      ev.body = json_str;
      window.dispatchEvent(ev);
    };
  },
  init() {
    //console.log(location.href);
    request(impl.get_locale_url()).then((res) => {
      this.notify();
      impl.update_lang(res);
      impl.load();
      window.addEventListener('hashchange', impl.dispatch, false);
    });

  }
};
