/* eslint-env node, mocha */

import assert from 'assert';
import {parse_hash_url, parse_hash_query} from './util';

describe('util', ()=> {

  describe('#parse_hash_url()', ()=> {
    [ ['home?page=online', '#miui-music%3A%2F%2Fhome%3Fpage%3Donline'],
      ['home', '#/home']
    ].forEach((tc, i)=> {
      it(`parse_hash_url_${i}::${tc[1]}`, ()=> {
        assert.equal(tc[0], parse_hash_url(tc[1]));
      });
    });
  });

  describe('#parse_hash_query()', ()=> {
    let obj = {
      a: 1,
      b: 'hello',
      c: '',
      d: [2, 3],
      e: {'new': 1}
    };
    let url = Object.keys(obj).map((k)=> {
      let v = (['string', 'number'].includes(typeof obj[k])) ?
        obj[k] : encodeURIComponent(JSON.stringify(obj[k]));
      return (v) ? encodeURIComponent(k) + '=' + v : '';
    }).join('&');
    let page = 'offline';
    let res = parse_hash_query(`http://0.0.0.0:9002/?${url}`, page);

    it('number/string', ()=> {
      assert.equal(res.a, obj.a); //@IGNORE 1 == '1'
      assert.equal(res.b, obj.b);
    });
    it('array/object', ()=> {
      assert.deepEqual(res.d, obj.d);
      assert.deepEqual(res.e, obj.e);
    });
    it('empty value', ()=> assert.ok(!('c' in res)) );
    it('default page', ()=> assert.equal(res.page, page) );
  });

});
