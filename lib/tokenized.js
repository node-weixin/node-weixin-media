var request = require("node-weixin-request");
var util = require("node-weixin-util");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');
var req = require("request");

module.exports = {
  json: function (url, app, data, params, cb) {
    auth.determine(app, function () {
      settings.get(app.id, 'auth', function (authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url = url + util.toParam(params);
        request.json(url, data, cb);
      });
    });
  },
  file: function (url, app, file, params, cb) {
    auth.determine(app, function () {
      settings.get(app.id, 'auth', function (authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url = url + util.toParam(params);
        request.file(url, file, cb);
      });
    });
  },
  download: function (url, app, file, params, cb) {
    auth.determine(app, function () {
      settings.get(app.id, 'auth', function (authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url = url + util.toParam(params);
        request.download(url, null, file.toString(), cb);
      });
    });
  },
  get: function (url, app, cb) {
    auth.determine(app, function () {
      settings.get(app.id, 'auth', function (authData) {
        url = url + util.toParam({
            access_token: authData.accessToken
          });
        req(url, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            //Return false if succeeded, else true
            cb(false, JSON.parse(body));
          } else {
            cb(true, {message: body});
          }
        });
      });
    });
  }
};
