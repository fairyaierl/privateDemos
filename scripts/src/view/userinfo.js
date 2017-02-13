import {_} from '../util';
import {default_cover} from '../config';
import miui from '../miui';
import dom from '../dom';


let user;
let node = document.createElement('div');
let key = ['userName', 'userAvatarUrl', 'userId'];

function bind(name) {
  return `bid="js_userinfo_${name}"`;
}

function fetch() {
  miui.mi('QueryUserInfo', 'callabck', null, (res)=> {
    user = res;
    key.forEach((k)=> {
      let def = (k === key[0]) ? _('not_login') : '';
      dom.update(`[${bind(k)}]`, (res[k] || def), node);
    });
  });
}

function register() {
  miui.mi('RegisterBroadcastReceiver', 'callback', 'android.accounts.LOGIN_ACCOUNTS_PRE_CHANGED', fetch);
}

function event() {
  // 最后一栏点击直接跳 settings
  dom.all('.row', node).slice(0, -1).forEach((d)=> {
    d.addEventListener('click', ()=> {
      if (user.userId) {
        miui.mi('HandleUri', 'sync', `miui-music://settings?anim=slide`, null);
      } else {
        miui.mi('LoginAccount', 'callback', null, fetch);
      }
    }, false);
  });
}

function render() {
  node.classList.add('box', 'user_info');
  node.innerHTML = `<div class="row"><img class="cover avatar" src="${default_cover.avatar}" ${bind('userAvatarUrl')} /></div>
    <div class="row">
      <div class="title" ${bind('userName')}>${_('not_login')}<span class="hq" ${bind('level')} hide></span></div>
      <div class="desc" ${bind('title')}></div>
    </div>
    <div class="row"><a href="settings">${_('presonal_center')}</a></div>`;

  register();
  event();
  return node;
}

export default render;
