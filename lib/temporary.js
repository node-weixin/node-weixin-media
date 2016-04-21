var tokenized = require('./tokenized');
var temporaryUrl = 'https://api.weixin.qq.com/cgi-bin/media/';
/* eslint camelcase: [2, {properties: "never"}] */

module.exports = {
  create: function (settings, app, type, file, cb) {
    tokenized.file(settings, app, temporaryUrl + 'upload?', file, {type: type}, cb);
  },
  get: function (settings, app, mediaId, file, cb) {
    tokenized.download(settings, app, temporaryUrl + 'get?', file, {media_id: mediaId}, cb);
  }
};
