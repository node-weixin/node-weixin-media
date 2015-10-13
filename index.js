'use strict';
var request = require("node-weixin-request");
var util = require("node-weixin-util");
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  temporary: require('./lib/temporary'),
  permanent: require('./lib/permanent'),
  count: function (app, auth, cb) {
    auth.determine(app, function() {
      var url = permanentUrl + 'get_materialcount?' + util.toParam({
          access_token: auth.accessToken
        });
      request.json(url, null, cb);
    });
  },
  list: function (app, auth, type, limit, offset, cb) {
    auth.determine(app, function() {
      var data = {
        type: type,
        offset: offset,
        count: limit
      };
      var url = permanentUrl + 'batchget_material?' + util.toParam({
          access_token: auth.accessToken
        });
      request.json(url, data, cb);
    });
  }
};
