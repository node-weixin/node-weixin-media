var request = require('node-weixin-request');
var util = require('node-weixin-util');
var auth = require('node-weixin-auth');

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

module.exports = {
  json: function(settings, app, url, data, params, cb) {
    auth.determine(settings, app, function() {
      settings.get(app.id, 'auth', function(authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url += util.toParam(params);
        request.json(url, data, cb);
      });
    });
  },
  file: function(settings, app, url, file, params, cb) {
    auth.determine(settings, app, function() {
      settings.get(app.id, 'auth', function(authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url += util.toParam(params);
        request.file(url, file, cb);
      });
    });
  },
  download: function(settings, app, url, file, params, cb) {
    auth.determine(settings, app, function() {
      settings.get(app.id, 'auth', function(authData) {
        params = params || {};
        params.access_token = authData.accessToken;
        url += util.toParam(params);
        request.download(url, null, file.toString(), cb);
      });
    });
  // },
  // get: function(settings, app, url, cb) {
  //   auth.determine(settings, app, function() {
  //     settings.get(app.id, 'auth', function(authData) {
  //       url += util.toParam({
  //         access_token: authData.accessToken
  //       });
  //       req(url, function(error, response, body) {
  //         if (!error && response.statusCode === 200) {
  //           // Return false if succeeded, else true
  //           cb(false, JSON.parse(body));
  //         } else {
  //           cb(true, {
  //             message: body
  //           });
  //         }
  //       });
  //     });
  //   });
  }
};
