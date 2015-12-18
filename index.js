'use strict';
var request = require("node-weixin-request");
var util = require("node-weixin-util");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  temporary: require('./lib/temporary'),
  permanent: require('./lib/permanent'),
  count: function (app, cb) {
    auth.determine(app, function() {
      var authData = settings.get(app.id, 'auth');
      var url = permanentUrl + 'get_materialcount?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, null, cb);
    });
  },
  list: function (app, type, limit, offset, cb) {
    auth.determine(app, function() {
      var data = {
        type: type,
        offset: offset,
        count: limit
      };
      var authData = settings.get(app.id, 'auth');
      var url = permanentUrl + 'batchget_material?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, data, cb);
    });
  }
};
