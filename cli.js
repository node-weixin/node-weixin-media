#!/usr/bin/env node
'use strict';
var meow = require('meow');
var nodeWeixinMedia = require('./');
var config = require('node-weixin-config');

var auth = require('node-weixin-auth').create();

var cli = meow({
  help: [
    'Usage',
    '  wxmedia count --id appid --secret appsecret --token apptoken',
    '  wxmedia list type limit offset --id appid --secret appsecret --token apptoken',
    '  wxmedia temp create type uploadFile --id appid --secret appsecret --token apptoken',
    '  wxmedia temp get --media-id mediaId --file file --id appid --secret appsecret --token apptoken',
    '  wxmedia perm create --name name --id appid --secret appsecret --token apptoken',
    '  wxmedia perm in --openid openid --id appid --secret appsecret --token apptoken',
    '  wxmedia perm update --groupid groupid --name name --id appid --secret appsecret --token apptoken',
    '  wxmedia perm move --group groupid --openid openid --id appid --secret appsecret --token apptoken',
    '',
    'Example',
    '  wxmedia list --id "wx111" --secret "wxSecret" --token "wxtoken"'
  ].join('\n')
});

config.app.init(cli.flags);
var app = cli.flags;
console.log(cli.input);
console.log(cli.flags);


var command = cli.input[0];

function callback(command, next) {
  return function (error, data) {
    if (error) {
      process.exit(1);
      console.log("Error occur: " + data);
    } else {
      console.info("Success on " + command + '!');
      console.info(data);
      if (data.errcode) {
        process.exit(1);
      }
      if (next) {
        next(data);
      }
    }
  };
}

switch (command) {
  case 'remark':
    var openid = cli.flags.openid;
    var remark = cli.flags.remark;
    nodeWeixinMedia[command](app, auth, openid, remark, callback(command));
    break;
  case 'list':
  case 'profile':
    var openid = cli.flags.openid || null;
    nodeWeixinMedia[command](app, auth, openid, callback(command));
    break;
  case 'group':
    var subCmd = cli.input[1];
    switch (subCmd) {
      case 'create':
        nodeWeixinMedia[command][subCmd](app, auth, cli.flags.name, callback(command));
        break;
      case 'get':
        nodeWeixinMedia[command][subCmd](app, auth, callback(command));
        break;
      case 'in':
        nodeWeixinMedia[command][subCmd](app, auth, cli.flags.openid, callback(command));
        break;
      case 'update':
        nodeWeixinMedia[command][subCmd](app, auth, cli.flags.groupid, cli.flags.name, callback(command));
        break;
      case 'move':
        nodeWeixinMedia[command][subCmd](app, auth, cli.flags.groupid, cli.flags.openid, callback(command));
        break;
    }
    break;
}

