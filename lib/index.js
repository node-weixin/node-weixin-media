'use strict';
var tokenized = require('./tokenized');
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  temporary: require('./temporary'),
  permanent: require('./permanent'),
  count: function (app, cb) {
    tokenized.json(permanentUrl + 'get_materialcount?', app, null, {}, cb);
  },
  list: function (app, type, limit, offset, cb) {
    var data = {
      type: type,
      offset: offset,
      count: limit
    };
    tokenized.json(permanentUrl + 'batchget_material?', app, data, {}, cb);
  }
};
