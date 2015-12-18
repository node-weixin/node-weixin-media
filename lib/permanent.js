var request = require("node-weixin-request");
var util = require("node-weixin-util");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  news: function (app, json, cb) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');

      var url = permanentUrl + 'add_news?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, json, cb);
    });
  },
  create: function (app, type, file, cb, description) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');

      var params = {
        type: type,
        access_token: authData.accessToken
      };
      switch (type) {
        case 'image':
        case 'voice':
        case 'thumb':
          break;
        case 'video':
          params.description = description;
        default :
          cb(true, {errmsg: 'Invalid type'});
          return;
      }
      var url = permanentUrl + 'add_material?' + util.toParam(params);
      request.file(url, file, cb);
    });
  },

  get: function (app, mediaId, cb) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');

      var data = {
        media_id: mediaId
      };
      var url = permanentUrl + 'get_material?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, data, cb);
    });
  },
  remove: function (app, mediaId, cb) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');
      var data = {
        media_id: mediaId
      };
      var url = permanentUrl + 'del_material?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, data, cb);
    });
  },
  update: function (app, data, cb) {
    auth.determine(app, function () {
      var authData = settings.get(app.id, 'auth');

      var url = permanentUrl + 'update_news?' + util.toParam({
          access_token: authData.accessToken
        });
      request.json(url, data, cb);
    });
  }
};
