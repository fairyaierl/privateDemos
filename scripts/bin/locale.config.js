var fs = require('fs'),
  dict = {},
  basedir = '/data/miui/locale',
  i18n_path = basedir + '/../I18N_res/v6/common/packages/apps/MiuiMusic/res/',
  project_path = basedir + '/../MiuiMusic/res/';

dict['values-en'] = project_path + 'values/strings.xml';
dict['values-zh-rCN'] = project_path + 'values-zh-rCN/strings.xml';

fs.readdirSync(i18n_path).forEach(function(d){
  dict[d] = i18n_path + d + '/strings.xml';
  //if (d=='values-en-rGB') dict[d] = i18n_path + d + '/strings.xml';
})

//dict = { 'values-en': project_path + 'values/strings.xml' };


module.exports = {
  chars: {
    '<': '&lt;',
    '>': '&gt;',
    '(': '&#40;',
    ')': '&#41;',
    '#': '&#35;',
    '&': '&amp;',
    //'"': '&quot;',
    "'": '&apos;'
  },
  output: '/data/miui/MiuiMusic/scripts/dest/lang/lang.js',
  placeholder: '${v}',
  //combine: true, //optional: all in one file
  pretty: true, //optional: output with indent
  dict: dict,
}
