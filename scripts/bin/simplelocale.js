#! /usr/bin/env node

"Strict Mode";

var fs = require('fs'),
  path = require('path'),
  expat = require('node-expat');


var tmp = {},
  locale = null,
  stack = [];


function get_parser() {
  var parser = new expat.Parser('UTF-8');
  parser.on('startElement', function(name, attrs) {
    if (name && attrs && attrs.name
        && ~['string', 'plurals'].indexOf(name.toLowerCase())) {
      var obj = {
        lang: locale,
        name: attrs.name.trim(),
        type: name.toLowerCase()
      };
      stack.push(obj);
    } else if (name.toLowerCase() == 'item') {
      var obj = stack[stack.length - 1];
      obj.item = obj.item || [];
      var item = { name: attrs.quantity.trim() };
      obj.item.push(item);
      //console.log("item.start::", name, attrs.quantity, obj);
    }
  })

  parser.on('text', function(text) {
    text = text.trim();
    if (text && stack.length > 0) {
      var obj = stack[stack.length - 1];
      if (obj.type == 'plurals') {
        //console.log(obj.item);
        if (obj.item && obj.item.length > 0) {
          var item = obj.item[obj.item.length - 1];
          item.text = item.text || '';
          item.text += text;
        }
      } else if (obj.type == 'string') {
        obj.text = obj.text || '';
        obj.text += text;
      }
      //console.log(obj);
    }
  })

  parser.on('error', function(error) {
    console.error("err: ",  error)
  })

  return parser;
}


function escape(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function sanitize(value) {
  if (typeof value !== 'string') {
    return value;
  }
  var chars = conf.chars;
  Object.keys(chars).forEach(function(key) {
    value = value.replace(new RegExp(escape(key), 'g'), chars[key]);
  });
  return value;
}


function stringify(obj) {
  if (conf.pretty) {
    return JSON.stringify(obj, null, "\t");
  } else {
    return JSON.stringify(obj);
  }
}

function rename_locale(name) {
  return name.replace('values-', '').replace('-r', '-').toLowerCase();
}


function main() {
  var dict = conf.dict;
  Object.keys(dict).forEach(function(k) {
    locale = rename_locale(k);
    //console.log(k, locale);
    var orig = fs.readFileSync(dict[k]).toString()
      .replace(/<xliff:g id="\w+">(.+?)<\/xliff:g>/g, conf.placeholder);
    //console.log(orig);
    get_parser().parse(orig);
  });

  var tmp = {};
  stack.forEach(function(d){
    tmp[d.name] = tmp[d.name] || {};
    if (d.type == 'string') {
      tmp[d.name][d.lang] = sanitize(d.text);
    } else if (d.type == 'plurals') {
      d.item.reduce(function(ret, o){
        ret[d.name][d.lang] = ret[d.name][d.lang] || {};
        ret[d.name][d.lang][o.name] = sanitize(o.text);
        return ret;
      }, tmp)
    }
  });

  //console.log(JSON.stringify(tmp, null, "\t"));
  //console.log(tmp);
  //var content = "export default " + JSON.stringify(tmp, null, "\t");
  if (conf.combine) {
    //var content = "export default " + stringify(tmp);
    fs.writeFileSync(conf.output, stringify(tmp));
  } else {
    Object.keys(conf.dict).forEach(function(d){
      var lang = rename_locale(d);
      var res = Object.keys(tmp).reduce(function(ret, d){
        var v = tmp[d][lang] || tmp[d][lang.split('-')[0]];
        if (v) {
          //console.log(d, v);
          ret[d] = v;
        } else {
          console.error('[parent key not found]: ', d, '\n', 'in', lang, JSON.stringify(Object.keys(tmp[d])), '\n');
        }
        //console.log(lang, d, ret[d], tmp[d]);
        return ret;
      }, {});
      fs.writeFileSync(conf.output.split('.js')[0] + '.' + lang + '.js', stringify(res));
    })
  }
}


if (require.main === module) {
  var args = process.argv.slice(2);
  var conf_path = path.join(process.cwd(), args[0]);
  if (fs.existsSync(conf_path)){
    var conf = require(conf_path);
  } else {
    console.error("config not found.")
  }

  main();
}
