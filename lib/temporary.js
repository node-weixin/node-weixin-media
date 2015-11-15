var request = require("node-weixin-request");
var util = require("node-weixin-util");
var temporaryUrl = 'https://api.weixin.qq.com/cgi-bin/media/';


module.exports = {
  create: function (app, auth, type, file, cb) {
    auth.determine(app, function() {
      var params = {
        type: type,
        access_token: app.auth.accessToken

      };
      var url = temporaryUrl + 'upload?' + util.toParam(params);
      request.file(url, file, cb);
    });
  },
  get: function (app, auth, mediaId, file, cb) {
    auth.determine(app, function() {
      var params = {
        media_id: mediaId,
        access_token: app.auth.accessToken
      };
      var url = temporaryUrl + 'get?' + util.toParam(params);
      request.download(url, null, file.toString(), cb);
    });
  }
}
