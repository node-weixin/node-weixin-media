var tokenized = require('./tokenized');
var temporaryUrl = 'https://api.weixin.qq.com/cgi-bin/media/';

module.exports = {
  create: function (app, type, file, cb) {
    tokenized.file(temporaryUrl + 'upload?', app, file, {type: type}, cb);
  },
  get: function (app, mediaId, file, cb) {
    tokenized.download(temporaryUrl + 'get?', app, file, {media_id: mediaId}, cb);
  }
};
