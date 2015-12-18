var request = require("node-weixin-request");
var util = require("node-weixin-util");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

var temporaryUrl = 'https://api.weixin.qq.com/cgi-bin/media/';


module.exports = {
  create: function (app, type, file, cb) {
    auth.determine(app, function() {
      var authData = settings.get(app.id, 'auth');
      var params = {
        type: type,
        access_token: authData.accessToken
      };
      var url = temporaryUrl + 'upload?' + util.toParam(params);
      request.file(url, file, cb);
    });
  },
  get: function (app, mediaId, file, cb) {
    auth.determine(app, function() {
      var authData = settings.get(app.id, 'auth');
      var params = {
        media_id: mediaId,
        access_token: authData.accessToken
      };
      var url = temporaryUrl + 'get?' + util.toParam(params);
      request.download(url, null, file.toString(), cb);
    });
  }
}
