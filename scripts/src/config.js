export const scheme_prefix = 'miui-music';

export const domain = {
  api: 'http://v2.fm.duokanbox.com',
  search: 'http://music.search.xiaomi.net'
};

export const default_cover = {
  album: 'img/album_default.png',
  artist: 'img/avatar_default.png',
  avatar: 'img/avatar_default.png'
};

export const locale_list = [
  'bn-in',
  'de',
  'en-gb',
  'en-in',
  'en',
  'es',
  'fr',
  'hi',
  'in',
  'it',
  'kn-in',
  'ml-in',
  'mr-in',
  'ms-my',
  'pt-br',
  'ro',
  'ru',
  'ta-in',
  'te-in',
  'th',
  'tr',
  'vi',
  'zh-cn',
  'zh-tw'
];

export const playlist = {
  all: '9223372036854775807',
  local: '9223372036854775800',
  favorite: '99',
  type: {
    normal: 0,      // 用户自定义
    fm: 101,        // 在线电台
    billboard: 102, // 在线榜单
    recommend: 103, // 在线推荐
    artist: 104,    // 在线歌手
    album: 105,     // 在线歌手的某个专辑
    all: 1008,

    search: 1001,  // 输入确定
    instant: 1002, // 输入框提示
    suggest: 1005, // 搜索推荐

    hot_song: 1012
  },
  uri: {
    private: 'content://com.miui.player.private/playlists'
  }
};
/*
let id_max = '9223372036854775807';
export var playlist = ['all', 'artist', 'album', 'nowplaying', 'none', 'create', 'my_playlist', 'local'].reduce((ret, k, i)=> {
  ret[k] = id_max.slice(0, -1) + (parseInt(id_max.slice(-1), 10) - i);
  return ret;
}, {});
var PLAYLIST_ID_GROUP_BY_ARTIST = Long.MAX_VALUE - 1;
var PLAYLIST_ID_GROUP_BY_ALBUM = Long.MAX_VALUE - 2;

var PLAYLIST_ID_NOWPLAYING = Long.MAX_VALUE - 3;
var PLAYLIST_ID_NONE = Long.MAX_VALUE - 4;
var PLAYLIST_ID_CREATE = Long.MAX_VALUE - 5;
var PLAYLIST_ID_MY_PLAYLIST_TITLE = Long.MAX_VALUE - 6;
var PLAYLIST_ID_LOCAL = Long.MAX_VALUE - 7;

*/
