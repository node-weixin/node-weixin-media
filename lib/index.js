'use strict';
var tokenized = require('./tokenized');
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  temporary: require('./temporary'),
  permanent: require('./permanent'),
  count: function (settings, app, cb) {
    tokenized.json(settings, app, permanentUrl + 'get_materialcount?', null, {}, cb);
  },
  list: function (settings, app, type, limit, offset, cb) {
    var data = {
      type: type,
      offset: offset,
      count: limit
    };
    tokenized.json(settings, app, permanentUrl + 'batchget_material?', data, {}, cb);
  }
};
