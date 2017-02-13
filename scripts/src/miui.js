import {_, URLBuilder} from './util';
import {playlist} from './config';

let miui;
let feature = {
  prefix: 'com.miui.player.hybrid.feature.',
  list: [
    'AddToPlaylist',
    'AlertInput', 'AlertList',
    'HandleUri', 'CreatePlaylist', 'DeletePlaylist', 'LoginAccount',
    'RegisterBroadcastReceiver',
    'RegisterDataCacheObserver',
    'RegisterForegroundObserver',
    'RegisterPlaylistObserver',
    'RegisterPlaylistObserver',
    'RegisterSearchInput',
    'RegisterUriObserver',
    'RequestNetwork',
    'GetSearchHistory',
    'UpdateSearchHistory',
    'QueryUserInfo',
    'QuerySearchInput',
    'QueryAllTrackCount',
    'QueryFavoriteArtistCount',
    'QueryFavoriteTrackCount',
    'QueryLocalTrackCount',
    'QueryPlaylistTracks',
    'QueryPlaylistList'
  ],
  getter: (name)=> {
    return (~feature.list.indexOf(name)) ? feature.prefix + name : name;
  }
};
const config = {
  vendor: 'com.miui.player',
  timestamp: 0,
  signature: 'somesignature',
  features: feature.list.map((x)=> {
    return {name: feature.getter(x)};
  }),
  permissions: [{
    origin: 'content://com.miui.player.hybrid'
  }]
};


//<http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/>
function uuid() {
  return 'cb_' + 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function mi(...args) {
  let [name, , param, callback] = args;
  //console.log([name, param, callback].join(' === '));

  if (!miui) {
    miui = window.MiuiJsBridge || {
      invoke(...kargs) {
        return console.log('Error: miui is undefined; args: ' + kargs.join(', '));
      }
    };
    if (miui.config) {
      miui.config(JSON.stringify(config));
    }
  }

  args[0] = feature.getter(name);
  if (param && typeof param !== 'string') {
    args[2] = JSON.stringify(param);
  }

  args[3] = callback || 'notify';
  if (callback && typeof callback === 'function') {
    let method = uuid();
    window[method] = (d)=> {
      //console.log(name + ' : ' + d);
      let obj = JSON.parse(d.replace(/[\n|\r]/g, ''));
      callback(obj.content);
      if (obj.code !== 10000) { //multiple callback from native
        setTimeout(()=> {
          delete window[method];
        }, 3000);
      }
    };
    args[3] = method;
  }
  //console.log(args);
  let res = miui.invoke(...args);
  //网络请求的返回值可能不是 json
  return (name === 'RequestNetwork') ? res : JSON.parse(res);
}


//mi(feature.getter('RegisterForegroundObserver'), 'callback', null, (res)=> {
  //console.log('on_rfo_callback: ', res);
//});

let count_dict = {
  all: 'QueryAllTrackCount',
  artist: 'QueryFavoriteArtistCount',
  favorite: 'QueryFavoriteTrackCount',
  local: 'QueryLocalTrackCount'
};

export default {

  mi,

  request(param) {
    let res = mi('com.miui.player.hybrid.feature.RequestNetwork', 'sync', param, null);
    return res.content;
    //console.log(JSON.parse(a.content.replace('\r\n', '')));
  },

  count: Object.keys(count_dict).reduce((ret, k)=> {
    ret[k] = (fn)=> mi(count_dict[k], 'callback', null, fn);
    return ret;
  }, {}),

  playback(id=playlist.all, type=playlist.type.all, name='全部歌曲', song_list=[], start=0) {
    let ub = new URLBuilder('service').append({
      id,
      start,
      type: encodeURIComponent(type),
      name: encodeURIComponent(name),
      songs: encodeURIComponent(JSON.stringify(song_list))
    }).done();
    return mi('HandleUri', 'sync', ub, null);
  },

  open(e) {
    e.preventDefault();
    //console.log(e.delegateTarget);
    let url = e.delegateTarget.getAttribute('href');

    //XXX http for all env
    if (window.location.protocol === 'http:') {
      window.location.hash = url;
    } else {
      let ub = new URLBuilder(url).replace('///', '//').append({anim: 'slide'}).done();
      mi('HandleUri', 'sync', ub, null);
    }
  },

  playlist: {

    track(id, fn) {
      return mi('QueryPlaylistTracks', 'callback', {
        playlistId: id
      }, fn);
    },

    mine(id_list=null, fn) {
      let param = id_list ? {playlistIds: id_list} : null;
      return mi('QueryPlaylistList', 'callback', param, (res)=> {
        res.list = res.list.filter((x) => !(~[99, 98, 96].indexOf(x._id)));
        fn(res);
      });
    },

    manage() {
      mi('AlertList', 'callback', {
        'title': _('manage_playlist'),
        'cancelable': true,
        'items': ['rename', 'delete'].map(_)
      }, (res)=> {
        console.log(res);
      });
    },

    add_song(id) {
      let ub = new URLBuilder('track_picker').append({dest_playlist_id: id}).done();
      mi('HandleUri', 'sync', ub, null);
    },

    add_song2(param) {//自定义列表传 globalIds, 在线列表传 songs
      this.mine((pl)=> {
        mi('AlertList', 'callback', {
          'title': _('addto_playlist'),
          'cancelable': true,
          'items': pl.list.reduce((ret, d)=> {
            ret.push(d.name);
            return ret;
          }, [_('create_playlist')])
        }, (res)=> {
          if (res.action === 'clickitem') {
            if (res.selection === 0) {
              this.create();
            } else {
              let sel = pl.list[res.selection - 1];
              param.playlistId = sel._id;
              mi('AddToPlaylist', 'sync', param, null);
            }
          }
        });
      });
    },

    create(fn) {
      mi('AlertInput', 'callback', {
        'title': _('dialog_title_add_playlist'),
        'positiveText': _('ok'),
        'negativeText': _('cancel'),
        'cancelable': true,
        'defaultText': _('new_playlist_name'),
        'showInputMethod': true
      }, (res)=> {
        if (res.action === 'positive' && res.input) {
          mi('CreatePlaylist', 'callback', {
            name: res.input,
            type: playlist.type.normal
          }, fn);
        }
      });
    },

    favorite({nid, intro, name, pic_large_url, list}) {
      return mi('CreatePlaylist', 'sync', {
        //@FIXME type 103
        type: 103,
        name,
        globalId: nid,
        songs: list,
        descript: intro,
        iconUrl: pic_large_url
      }, null);
    },

    remove(id_list, callback=null) {
      return mi('DeletePlaylist', callback ? 'callback' : 'sync', {
        playlistIds: id_list
      }, callback);
    }
  },

  search: {
    history(param) {
      if (param) {
        return mi('UpdateSearchHistory', 'sync', param, null);
      } else {
        return mi('GetSearchHistory', 'sync', null, null);
      }
    }
  }

};
